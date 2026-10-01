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

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Welcome({ breadcrumbs, instagramPosts }: WelcomeProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        '/images/home/slide-1.webp',
        '/images/home/slide-2.webp',
        '/images/home/slide-3.webp',
    ];

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
                <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500/30 overflow-x-hidden">

                    {/* 1. HERO SECTION */}
                    <section className="relative h-[90vh] md:h-[95vh] flex items-center overflow-hidden bg-black">
                        <div className="absolute inset-0 z-0">
                            {slides.map((img, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                        index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                                    } transition-transform duration-[5000ms]`}
                                >
                                    <img
                                        src={img}
                                        className="w-full h-full object-cover"
                                        alt={`Slide ${index + 1}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                                </div>
                            ))}
                        </div>
                        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
                            <div className="max-w-3xl">
                                <span className="inline-block text-orange-400 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 italic">
                                    HoopsLegacy Academy
                                </span>
                                <h1 className="text-5xl md:text-8xl font-black leading-[0.9] text-white mb-6 tracking-tighter uppercase italic">
                                    Unlock Your <br />
                                    <span className="text-orange-500">On Court</span>
                                </h1>
                                <p className="text-sm md:text-lg text-gray-300 mb-10 max-w-lg leading-relaxed font-medium">
                                    Program pelatihan basket intensif dengan kurikulum terukur untuk pemula hingga profesional. Dibimbing oleh pelatih bersertifikasi internasional.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/program/member"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-black text-xs transition-all text-center uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                    <Link
                                        href="/about#video-section"
                                        className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95"
                                    >
                                        <PlayCircle size={18} className="text-orange-400" /> Lihat Video
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Slide Indicator */}
                        <div className="absolute bottom-10 left-6 md:left-24 right-6 md:right-24 z-20">
                            <div className="flex gap-3 items-center">
                                {slides.map((_, i) => (
                                    <div key={i} className="h-1 bg-white/10 flex-1 overflow-hidden rounded-full">
                                        <div
                                            className={`h-full bg-[#0056b3] transition-all duration-[5000ms] ease-linear ${
                                                i === currentSlide ? 'w-full' : 'w-0'
                                            }`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 2. FACILITIES SECTION */}
                    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div>
                                <h2 className="text-orange-500 font-black uppercase tracking-[0.2em] text-[10px] mb-3 italic">Our Facilities</h2>
                                <h3 className="text-4xl md:text-6xl font-black text-[#020617] uppercase tracking-tighter italic leading-none">
                                    Standar <span className="text-[#0056b3]">Internasional</span>
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Lapangan Standar FIBA', desc: 'Permukaan lantai kayu maple berkualitas tinggi dengan grip profesional.', img: '/images/home/fslts-1.webp' },
                                { title: 'Gym & Fitness', desc: 'Peralatan latihan kekuatan modern untuk meningkatkan performa atlet.', img: '/images/home/fslts-2.webp' },
                                { title: 'Loker & Shower', desc: 'Fasilitas ruang ganti yang bersih, aman, dan nyaman bagi member.', img: '/images/home/fslts-3.webp' },
                            ].map((item, i) => (
                                <div key={i} className="group bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-[#0056b3]/20 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#0056b3]/5">
                                    <div className="h-72 overflow-hidden relative">
                                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                                    </div>
                                    <div className="p-10">
                                        <h4 className="text-2xl font-black text-[#020617] uppercase mb-3 tracking-tighter italic">{item.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. LATEST NEWS — Feed Instagram */}
                    <section className="py-24 md:py-32 bg-[#020617] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0056b3]/10 rounded-full blur-[120px] pointer-events-none" />

                        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-2 w-16 bg-orange-500"></div>
                                        <span className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Langsung dari Instagram</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter italic">
                                        LATEST <span className="text-orange-500 underline decoration-white/10 decoration-4 underline-offset-8">NEWS</span>
                                    </h2>
                                </div>

                                <a
                                    href={IG_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 self-start md:self-auto bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 text-white pl-5 pr-6 py-3 rounded-full transition-all duration-300"
                                >
                                    <Instagram size={20} className="text-orange-400 group-hover:text-white transition-colors" />
                                    <span className="font-black text-xs uppercase tracking-widest">Ikuti {IG_HANDLE}</span>
                                </a>
                            </div>

                            {/* Grid postingan */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                                {posts.map((post) => {
                                    const cover = post.media_type === 'VIDEO' ? (post.thumbnail_url ?? post.media_url) : post.media_url;
                                    return (
                                        <a
                                            key={post.id}
                                            href={post.permalink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Buka postingan Instagram tanggal ${formatDate(post.timestamp)}`}
                                            className="group relative block aspect-square overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                                        >
                                            <img
                                                src={cover}
                                                alt={post.caption ? post.caption.slice(0, 80) : 'Postingan Instagram Roar Basketball'}
                                                loading="lazy"
                                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                            />

                                            {/* Badge tipe media */}
                                            {post.media_type !== 'IMAGE' && (
                                                <span className="absolute top-3 right-3 md:top-4 md:right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full">
                                                    {post.media_type === 'VIDEO' ? <Play size={14} fill="currentColor" /> : <Layers size={14} />}
                                                </span>
                                            )}

                                            {/* Overlay caption */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-[#020617]/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                                                <span className="text-orange-400 font-bold text-[10px] uppercase tracking-widest mb-2">
                                                    {formatDate(post.timestamp)}
                                                </span>
                                                {post.caption && (
                                                    <p className="text-white text-xs md:text-sm font-medium leading-snug line-clamp-2 md:line-clamp-3">
                                                        {post.caption}
                                                    </p>
                                                )}
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Lihat semua */}
                            <div className="mt-12 flex justify-center">
                                <a
                                    href={IG_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 text-white font-black uppercase text-[10px] tracking-[0.3em] hover:text-orange-500 transition-colors"
                                >
                                    <span className="h-[1px] w-8 bg-orange-500 group-hover:w-12 transition-all"></span>
                                    Lihat Semua di Instagram
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* 4. CTA SECTION */}
                    <section className="py-24 px-6 bg-white">
                        <div className="max-w-6xl mx-auto bg-[#0056b3] rounded-[3.5rem] p-10 md:p-24 text-center relative overflow-hidden shadow-3xl shadow-[#0056b3]/20">
                            {/* Decorative Icon */}
                            <div className="absolute -bottom-24 -right-24 opacity-10 text-white rotate-12">
                                <Trophy size={480} />
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 relative z-10 leading-none">
                                JADILAH LEGENDA <br /> <span className="text-orange-400">SELANJUTNYA</span>
                            </h2>
                            <p className="text-blue-100 mb-12 text-lg max-w-2xl mx-auto relative z-10 font-medium italic">
                                Bergabunglah dengan kurikulum basket terbaik di Indonesia. Mulai perjalanan profesionalmu hari ini.
                            </p>
                            <Link
                                href="/program/member"
                                className="inline-flex bg-white text-[#0056b3] px-16 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-500 hover:text-white transition-all shadow-xl relative z-10 hover:-translate-y-2 active:scale-95"
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