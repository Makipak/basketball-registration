import React, { useState, useEffect } from 'react';
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { Footer } from '@/components/footer';
import type { AppLayoutProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Trophy,
    PlayCircle,
    Instagram,
    Play,
    Layers,
    ArrowRight,
} from 'lucide-react';

/**
 * Bentuk data ini mengikuti field Instagram Graph API (GET /{ig-user-id}/media):
 * id, caption, media_type, media_url, thumbnail_url, permalink, timestamp.
 * Backend cukup mengirim array dengan struktur ini lewat props Inertia:
 *   return Inertia::render('welcome', ['instagramPosts' => $posts]);
 */
export interface InstagramPost {
    id: string;
    caption?: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    media_url: string;
    thumbnail_url?: string; // dipakai kalau media_type = VIDEO
    permalink: string;
    timestamp: string; // ISO 8601
}

type WelcomeProps = AppLayoutProps & {
    instagramPosts?: InstagramPost[];
};

// ⚠️ DATA DUMMY — dipakai selama backend belum terhubung.
// Hapus / abaikan setelah props `instagramPosts` dikirim dari server.
const dummyPosts: InstagramPost[] = [
    { id: '1', media_type: 'IMAGE', media_url: '/images/news/news-1.webp', permalink: 'https://www.instagram.com/roarbasketball_championship/', timestamp: '2026-04-12T09:00:00Z', caption: 'Persiapan menuju National Championship 2026. Seleksi ketat sudah dimulai, siapa yang siap tampil?' },
    { id: '2', media_type: 'VIDEO', media_url: '/images/news/news-2.webp', thumbnail_url: '/images/news/news-2.webp', permalink: 'https://www.instagram.com/roarbasketball_championship/', timestamp: '2026-04-08T09:00:00Z', caption: 'Highlight latihan intensif Roar Basketball Championship minggu ini. Drill dribbling dan shooting tanpa henti.' },
    { id: '3', media_type: 'CAROUSEL_ALBUM', media_url: '/images/news/news-3.webp', permalink: 'https://www.instagram.com/roarbasketball_championship/', timestamp: '2026-04-03T09:00:00Z', caption: 'Momen seru di National League 2026. Terima kasih untuk semua dukungan!' },
    { id: '4', media_type: 'IMAGE', media_url: '/images/news/news-2.webp', permalink: 'https://www.instagram.com/roarbasketball_championship/', timestamp: '2026-03-28T09:00:00Z', caption: 'Selamat kepada para juara yang sudah bekerja keras sepanjang musim.' },
    { id: '5', media_type: 'VIDEO', media_url: '/images/news/news-3.webp', thumbnail_url: '/images/news/news-3.webp', permalink: 'https://www.instagram.com/roarbasketball_championship/', timestamp: '2026-03-21T09:00:00Z', caption: 'Behind the scene sesi latihan pagi bersama Coach Fictor.' },
    { id: '6', media_type: 'IMAGE', media_url: '/images/news/news-1.webp', permalink: 'https://www.instagram.com/roarbasketball_championship/', timestamp: '2026-03-15T09:00:00Z', caption: 'Pendaftaran member baru Roar Basketball Championship batch berikutnya sudah dibuka. Cek link di bio.' },
];

const IG_HANDLE = '@roarbasketball_championship';
const IG_URL = 'https://www.instagram.com/roarbasketball_championship/';

const slides = [
    '/images/home/slide-1.webp',
    '/images/home/slide-2.webp',
    '/images/home/slide-3.webp',
];

const facilities = [
    { title: 'Lapangan Standar FIBA', desc: 'Permukaan lantai kayu maple berkualitas tinggi dengan grip profesional.', img: '/images/home/fslts-1.webp' },
    { title: 'Gym & Fitness', desc: 'Peralatan latihan kekuatan modern untuk meningkatkan performa atlet.', img: '/images/home/fslts-2.webp' },
    { title: 'Loker & Shower', desc: 'Fasilitas ruang ganti yang bersih, aman, dan nyaman bagi member.', img: '/images/home/fslts-3.webp' },
];

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Welcome({ breadcrumbs, instagramPosts }: WelcomeProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Pakai data dari backend kalau ada, kalau tidak pakai dummy. Tampilkan maksimal 6.
    const posts = (instagramPosts && instagramPosts.length > 0 ? instagramPosts : dummyPosts).slice(0, 6);

    return (
        <AppShell variant="header">
            <Head title="Beranda RoringBasketball" />

            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header" className="p-0">
                <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 selection:bg-orange-500/30">

                    {/* 1. HERO SECTION */}
                    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-black pb-24 pt-16 sm:min-h-[90svh] md:min-h-[95svh] md:pb-20 md:pt-0">
                        <div className="absolute inset-0 z-0">
                            {slides.map((img, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-[opacity,transform] duration-[1000ms] ease-in-out ${
                                        index === currentSlide ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        className="h-full w-full object-cover"
                                        alt={`Slide ${index + 1}`}
                                    />
                                    {/* Mobile: gelap merata. Desktop: gradient dari kiri */}
                                    <div className="absolute inset-0 bg-black/60 md:hidden"></div>
                                    <div className="absolute inset-0 hidden bg-gradient-to-r from-black/90 via-black/40 to-transparent md:block"></div>
                                </div>
                            ))}
                        </div>
                        <div className="container relative z-10 mx-auto px-5 sm:px-8 md:px-12 lg:px-24">
                            <div className="max-w-3xl">
                                <span className="mb-3 inline-block text-[10px] font-black uppercase italic tracking-[0.25em] text-orange-400 sm:text-[11px] md:mb-4 md:text-xs md:tracking-[0.3em]">
                                    HoopsLegacy Academy
                                </span>
                                <h1 className="mb-5 text-4xl font-black uppercase italic leading-[0.92] tracking-tighter text-white sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl">
                                    Unlock Your <br />
                                    <span className="text-orange-500">On Court</span>
                                </h1>
                                <p className="mb-8 max-w-md text-sm font-medium leading-relaxed text-gray-300 sm:text-base md:mb-10 md:max-w-lg md:text-lg">
                                    Program pelatihan basket intensif dengan kurikulum terukur untuk pemula hingga profesional. Dibimbing oleh pelatih bersertifikasi internasional.
                                </p>

                                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                    <Link
                                        href="/program/member"
                                        className="rounded-xl bg-orange-500 px-6 py-3.5 text-center text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95 sm:px-8 md:px-10 md:py-4"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                    <Link
                                        href="/about#video-section"
                                        className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 sm:px-8 md:px-10 md:py-4"
                                    >
                                        <PlayCircle size={18} className="text-orange-400" /> Lihat Video
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Slide Indicator */}
                        <div className="absolute bottom-6 left-5 right-5 z-20 sm:bottom-8 sm:left-8 sm:right-8 md:bottom-10 md:left-12 md:right-12 lg:left-24 lg:right-24">
                            <div className="flex items-center gap-2 md:gap-3">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setCurrentSlide(i)}
                                        aria-label={`Slide ${i + 1}`}
                                        className="flex h-5 flex-1 items-center"
                                    >
                                        <span className="block h-1 w-full overflow-hidden rounded-full bg-white/10">
                                            <span
                                                className={`block h-full bg-[#0056b3] transition-all duration-[5000ms] ease-linear ${
                                                    i === currentSlide ? 'w-full' : 'w-0'
                                                }`}
                                            />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 2. FACILITIES SECTION */}
                    <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-24">
                        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-12 md:mb-16 md:flex-row md:items-end">
                            <div>
                                <h2 className="mb-2 text-[10px] font-black uppercase italic tracking-[0.2em] text-orange-500 md:mb-3">Our Facilities</h2>
                                <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter text-[#020617] sm:text-4xl md:text-5xl lg:text-6xl">
                                    Standar <span className="text-[#0056b3]">Internasional</span>
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                            {facilities.map((item, i) => (
                                <div
                                    key={i}
                                    className={`group overflow-hidden rounded-[1.75rem] border border-slate-100 bg-slate-50 shadow-sm transition-all duration-500 hover:border-[#0056b3]/20 hover:bg-white hover:shadow-2xl hover:shadow-[#0056b3]/5 md:rounded-[2.5rem] ${
                                        i === facilities.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
                                    }`}
                                >
                                    <div className="relative h-52 overflow-hidden sm:h-56 lg:h-72">
                                        <img src={item.img} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                                    </div>
                                    <div className="p-6 sm:p-7 lg:p-10">
                                        <h4 className="mb-2 text-xl font-black uppercase italic tracking-tighter text-[#020617] sm:text-2xl md:mb-3">{item.title}</h4>
                                        <p className="text-sm font-medium leading-relaxed text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. LATEST NEWS — Feed Instagram */}
                    <section className="relative overflow-hidden bg-[#020617] py-14 sm:py-20 md:py-28 lg:py-32">
                        <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-[#0056b3]/10 blur-[100px] md:h-[600px] md:w-[600px] md:blur-[120px]" />

                        <div className="container relative z-10 mx-auto px-5 sm:px-8 md:px-12 lg:px-24">
                            {/* Header */}
                            <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-12 md:mb-16 md:flex-row md:items-end md:gap-8">
                                <div>
                                    <div className="mb-3 flex items-center gap-3 md:mb-4 md:gap-4">
                                        <div className="h-1.5 w-12 shrink-0 bg-orange-500 md:h-2 md:w-16"></div>
                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 sm:text-[10px] sm:tracking-[0.3em]">Langsung dari Instagram</span>
                                    </div>
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                                        LATEST <span className="text-orange-500 underline decoration-white/10 decoration-4 underline-offset-8">NEWS</span>
                                    </h2>
                                </div>

                                <a
                                    href={IG_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 py-3 pl-5 pr-6 text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 sm:w-auto md:self-auto"
                                >
                                    <Instagram size={20} className="shrink-0 text-orange-400 transition-colors group-hover:text-white" />
                                    <span className="truncate text-[11px] font-black uppercase tracking-widest sm:text-xs">Ikuti {IG_HANDLE}</span>
                                </a>
                            </div>

                            {/* Grid postingan */}
                            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-5 lg:grid-cols-3 lg:gap-6">
                                {posts.map((post) => {
                                    const cover = post.media_type === 'VIDEO' ? (post.thumbnail_url ?? post.media_url) : post.media_url;
                                    return (
                                        <a
                                            key={post.id}
                                            href={post.permalink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Buka postingan Instagram tanggal ${formatDate(post.timestamp)}`}
                                            className="group relative block aspect-square overflow-hidden rounded-xl border border-white/5 bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:rounded-2xl md:rounded-3xl"
                                        >
                                            <img
                                                src={cover}
                                                alt={post.caption ? post.caption.slice(0, 80) : 'Postingan Instagram Roar Basketball'}
                                                loading="lazy"
                                                className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                                            />

                                            {/* Badge tipe media */}
                                            {post.media_type !== 'IMAGE' && (
                                                <span className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm sm:right-3 sm:top-3 md:right-4 md:top-4 md:p-2">
                                                    {post.media_type === 'VIDEO' ? <Play size={12} fill="currentColor" /> : <Layers size={12} />}
                                                </span>
                                            )}

                                            {/* Overlay caption: selalu tampil di layar sentuh, hover di desktop */}
                                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#020617]/95 via-[#020617]/30 to-transparent p-3 opacity-100 transition-opacity duration-500 sm:p-4 md:p-5 md:opacity-0 md:group-hover:opacity-100 lg:p-6">
                                                <span className="mb-1 text-[9px] font-bold uppercase tracking-widest text-orange-400 sm:mb-2 sm:text-[10px]">
                                                    {formatDate(post.timestamp)}
                                                </span>
                                                {post.caption && (
                                                    <p className="line-clamp-2 text-[11px] font-medium leading-snug text-white sm:text-xs md:line-clamp-3 md:text-sm">
                                                        {post.caption}
                                                    </p>
                                                )}
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Lihat semua */}
                            <div className="mt-10 flex justify-center md:mt-12">
                                <a
                                    href={IG_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:text-orange-500 sm:tracking-[0.3em]"
                                >
                                    <span className="h-[1px] w-6 bg-orange-500 transition-all group-hover:w-10 md:w-8 md:group-hover:w-12"></span>
                                    Lihat Semua di Instagram
                                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* 4. CTA SECTION */}
                    <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 md:py-24">
                        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#0056b3] p-7 text-center shadow-2xl shadow-[#0056b3]/20 sm:rounded-[2.5rem] sm:p-12 md:rounded-[3.5rem] md:p-20 lg:p-24">
                            {/* Decorative Icon */}
                            <div className="pointer-events-none absolute -bottom-12 -right-12 rotate-12 text-white opacity-10 md:-bottom-24 md:-right-24">
                                <Trophy className="h-56 w-56 sm:h-72 sm:w-72 md:h-[480px] md:w-[480px]" />
                            </div>

                            <h2 className="relative z-10 mb-5 text-3xl font-black uppercase italic leading-none tracking-tighter text-white sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
                                JADILAH LEGENDA <br /> <span className="text-orange-400">SELANJUTNYA</span>
                            </h2>
                            <p className="relative z-10 mx-auto mb-8 max-w-2xl text-sm font-medium italic text-blue-100 sm:text-base md:mb-12 md:text-lg">
                                Bergabunglah dengan kurikulum basket terbaik di Indonesia. Mulai perjalanan profesionalmu hari ini.
                            </p>
                            <Link
                                href="/program/member"
                                className="relative z-10 inline-flex w-full items-center justify-center rounded-2xl bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.15em] text-[#0056b3] shadow-xl transition-all hover:-translate-y-1 hover:bg-orange-500 hover:text-white active:scale-95 sm:w-auto sm:px-12 md:px-16 md:py-6 md:tracking-[0.2em] md:hover:-translate-y-2"
                            >
                                Klik Untuk Mendaftar
                            </Link>
                        </div>
                    </section>

                    <Footer />

                </div>
            </AppContent>

            <style>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.8);
                }
            `}</style>
        </AppShell>
    );
}