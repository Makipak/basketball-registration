// Jalankan tunnel ngrok ke scripts/static-proxy.mjs (:8787), yang meneruskan request dinamis ke `php artisan serve` (:8000).
// Domain static dibaca dari NGROK_DOMAIN (env / .env). Kalau kosong, ngrok kasih URL acak.
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

function readFromDotEnv(key) {
    if (!existsSync('.env')) return undefined;
    const match = readFileSync('.env', 'utf8').match(new RegExp(`^${key}=(.*)$`, 'm'));
    return match?.[1].trim().replace(/^["']|["']$/g, '') || undefined;
}

const domain = process.env.NGROK_DOMAIN || readFromDotEnv('NGROK_DOMAIN');
const port = process.env.NGROK_PORT || process.env.PROXY_PORT || '8787';

const args = ['http', port];
if (domain) args.push(`--url=${domain}`);

console.log(`[ngrok] http ${port}${domain ? ` -> https://${domain}` : ' (random URL, lihat http://127.0.0.1:4040)'}`);

// Satu string command + shell:true (Windows butuh shell utk resolve ngrok) -> tanpa DEP0190 warning
const child = spawn(`ngrok ${args.join(' ')}`, { stdio: 'inherit', shell: true });
child.on('error', (err) => {
    console.error('[ngrok] gagal start. Pastikan ngrok terinstall & authtoken sudah diset:', err.message);
    process.exit(1);
});
child.on('exit', (code) => process.exit(code ?? 0));
