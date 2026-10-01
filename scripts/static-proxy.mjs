// Front server untuk mode ngrok/demo:
//  - file statis di public/ (video, gambar, build) dilayani langsung oleh Node: paralel + dukungan HTTP Range
//  - request lain diteruskan ke `php artisan serve` (PHP built-in server itu single-thread di Windows,
//    sehingga video besar bisa bikin request lain macet).
import http from 'node:http';
import { createReadStream, existsSync, statSync, unlinkSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';

const PUBLIC_DIR = resolve('public');

// public/hot dibuat oleh `npm run dev` (Vite dev server). Selama file ini ada, Laravel menulis URL aset
// ke http://127.0.0.1:5173 -> di browser orang lain (lewat ngrok) CSS/JS gagal dimuat dan halaman rusak.
// Mode ngrok memakai hasil build, jadi hapus hot yang tersisa.
const hotFile = join(PUBLIC_DIR, 'hot');
if (existsSync(hotFile)) {
    try {
        unlinkSync(hotFile);
        console.warn('[proxy] public/hot ditemukan dan dihapus (sisa `npm run dev`). Kalau Vite dev masih jalan di terminal lain, hentikan dulu.');
    } catch (err) {
        console.error(`[proxy] Gagal menghapus public/hot (${err.message}). Hapus manual, atau halaman akan memuat aset dari 127.0.0.1:5173.`);
    }
}
const PORT = Number(process.env.PROXY_PORT || 8787);
const PHP_PORT = Number(process.env.PHP_PORT || 8000);

// Whitelist ekstensi: .php, .htaccess, dll tidak pernah dilayani langsung -> selalu lewat PHP/Laravel.
const TYPES = {
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain; charset=utf-8',
};

function serveStatic(req, res) {
    if (req.method !== 'GET' && req.method !== 'HEAD') return false;

    let pathname;
    try {
        pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    } catch {
        return false;
    }
    if (pathname.includes('\0')) return false;

    const file = normalize(join(PUBLIC_DIR, pathname));
    if (!file.startsWith(PUBLIC_DIR + sep)) return false; // anti path traversal

    const type = TYPES[extname(file).toLowerCase()];
    if (!type) return false;

    let st;
    try {
        st = statSync(file);
    } catch {
        return false;
    }
    if (!st.isFile()) return false;

    const etag = `"${st.size.toString(16)}-${Math.floor(st.mtimeMs).toString(16)}"`;
    const headers = {
        'Content-Type': type,
        'Accept-Ranges': 'bytes',
        ETag: etag,
        'Last-Modified': st.mtime.toUTCString(),
        // /build/ berisi file ber-hash -> aman di-cache lama; sisanya cache pendek agar perubahan tetap kelihatan.
        'Cache-Control': pathname.startsWith('/build/') ? 'public, max-age=31536000, immutable' : 'public, max-age=300',
    };

    if (req.headers['if-none-match'] === etag) {
        res.writeHead(304, headers);
        res.end();
        return true;
    }

    let start = 0;
    let end = st.size - 1;
    let status = 200;

    const range = req.headers.range;
    if (range) {
        const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
        if (!m || (m[1] === '' && m[2] === '')) {
            res.writeHead(416, { ...headers, 'Content-Range': `bytes */${st.size}` });
            res.end();
            return true;
        }
        if (m[1] === '') {
            start = Math.max(st.size - Number(m[2]), 0); // suffix: bytes=-500
        } else {
            start = Number(m[1]);
            if (m[2] !== '') end = Math.min(Number(m[2]), st.size - 1);
        }
        if (start > end || start >= st.size) {
            res.writeHead(416, { ...headers, 'Content-Range': `bytes */${st.size}` });
            res.end();
            return true;
        }
        status = 206;
        headers['Content-Range'] = `bytes ${start}-${end}/${st.size}`;
    }

    headers['Content-Length'] = end - start + 1;
    res.writeHead(status, headers);
    if (req.method === 'HEAD') {
        res.end();
        return true;
    }

    const stream = createReadStream(file, { start, end });
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy()); // browser batalkan request -> hentikan baca file
    stream.pipe(res);
    return true;
}

function proxyToPhp(req, res) {
    const upstream = http.request(
        { host: '127.0.0.1', port: PHP_PORT, method: req.method, path: req.url, headers: req.headers },
        (up) => {
            res.writeHead(up.statusCode ?? 502, up.headers);
            up.pipe(res);
        },
    );
    upstream.on('error', () => {
        if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Laravel (php artisan serve :${PHP_PORT}) belum siap, coba refresh sebentar lagi.`);
    });
    res.on('close', () => upstream.destroy());
    req.pipe(upstream);
}

const server = http.createServer((req, res) => {
    if (!serveStatic(req, res)) proxyToPhp(req, res);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`[proxy] Port ${PORT} sudah dipakai program lain. Pakai port lain, mis. di PowerShell:`);
        console.error(`        $env:PROXY_PORT=9090; npm run dev:ngrok`);
    } else {
        console.error('[proxy]', err.message);
    }
    process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`[proxy] http://127.0.0.1:${PORT}  (statis dari public/, sisanya -> PHP :${PHP_PORT})`);
});
