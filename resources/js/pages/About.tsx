import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { Footer } from '@/components/footer';
import { Head, Link } from '@inertiajs/react';
import {
    Play,
    Users,
    Trophy,
    Target,
    MapPin,
    Zap,
    ChevronRight,
    Medal,
    Instagram,
    Youtube,
    Facebook,
    Music2,
} from 'lucide-react';

// Video reels (portrait 9:16). File web hasil kompres ada di public/videos/ (720p, faststart).
// Poster di public/images/about/. Untuk menambah video: encode dengan
//   ffmpeg -i in.mp4 -vf "scale=720:1280,fps=30" -c:v libx264 -crf 27 -preset fast -c:a aac -b:a 96k -movflags +faststart out.mp4
const reels = [
    { src: '/videos/roar-highlights-vs-cs.mp4', poster: '/images/about/roar-highlights-vs-cs.webp', title: 'Roar Highlights vs CS' },
    { src: '/videos/kenneth-vs-cs.mp4', poster: '/images/about/kenneth-vs-cs.webp', title: 'Kenneth vs CS' },
    { src: '/videos/kenneth-vs-cougar.mp4', poster: '/images/about/kenneth-vs-cougar.webp', title: 'Kenneth vs Cougar' },
    { src: '/videos/kenneth-vs-ht.mp4', poster: '/images/about/kenneth-vs-ht.webp', title: 'Kenneth vs HT' },
];

function ReelCard({ src, poster, title }: (typeof reels)[number]) {
    const ref = React.useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        const v = ref.current;
        if (!v) return;
        if (v.paused) {
            // pause reel lain supaya tidak tumpang tindih
            document.querySelectorAll<HTMLVideoElement>('video[data-reel]').forEach((el) => {
                if (el !== v) el.pause();
            });
            v.play().catch(() => setPlaying(false));
        } else {
            v.pause();
        }
    };

    return (
        <div className="group relative aspect-[9/16] w-[68vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-2xl bg-slate-950 shadow-2xl ring-1 ring-white/10 sm:w-[42vw] sm:max-w-[320px] md:w-auto md:max-w-none md:rounded-3xl">
            <video
                ref={ref}
                data-reel
                src={src}
                poster={poster}
                preload="none" // jangan download video sebelum diklik
                playsInline // wajib di iOS agar tidak auto-fullscreen
                loop
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onClick={toggle}
                className="h-full w-full cursor-pointer object-cover"
            />
            {!playing && (
                <button
                    type="button"
                    onClick={toggle}
                    aria-label={`Putar video ${title}`}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-100"
                >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-2xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110 active:scale-95 sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                        <Play className="ml-1 h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9" fill="currentColor" strokeWidth={0} />
                    </span>
                    <span className="absolute bottom-3 left-3 right-3 text-left text-[11px] font-bold text-white drop-shadow sm:bottom-4 sm:left-4 sm:right-4 sm:text-xs lg:text-sm">
                        {title}
                    </span>
                </button>
            )}
        </div>
    );
}

// Carousel reel: di mobile berputar tanpa ujung (infinite), di desktop grid biasa.
// Cara kerja: list di-render 3x [A][B][C]; mulai di set tengah (B). Setelah scroll berhenti,
// kalau posisi masuk set A / C, scrollLeft digeser sebesar lebar 1 set sehingga tampilan
// identik tapi kita kembali di set tengah -> user bisa swipe ke arah mana pun tanpa mentok.
// Salinan A & C disembunyikan di md+ supaya grid desktop tetap 4 video.
function ReelCarousel() {
    const ref = React.useRef<HTMLDivElement>(null);
    const n = reels.length;
    const items = [0, 1, 2].flatMap((copy) => reels.map((r) => ({ ...r, copy })));

    React.useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const setWidth = () => {
            const a = el.children[0] as HTMLElement | undefined;
            const b = el.children[n] as HTMLElement | undefined;
            return a && b ? b.offsetLeft - a.offsetLeft : 0;
        };

        // jump tanpa animasi & tanpa snap supaya tidak terlihat "loncat"
        const jump = (delta: number) => {
            el.style.scrollSnapType = 'none';
            el.scrollLeft += delta;
            requestAnimationFrame(() => {
                el.style.scrollSnapType = '';
            });
        };

        const isCarousel = () => el.scrollWidth > el.clientWidth + 1;

        // posisi awal: item pertama di set tengah, rata tengah
        const init = () => {
            if (!isCarousel()) return;
            const first = el.children[n] as HTMLElement;
            el.style.scrollSnapType = 'none';
            el.scrollLeft = first.offsetLeft - (el.clientWidth - first.offsetWidth) / 2;
            requestAnimationFrame(() => {
                el.style.scrollSnapType = '';
            });
        };
        init();

        let timer: ReturnType<typeof setTimeout>;
        const onScroll = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (!isCarousel()) return;
                const w = setWidth();
                if (!w) return;
                if (el.scrollLeft < w * 0.5) jump(w);
                else if (el.scrollLeft > w * 1.5) jump(-w);
            }, 120);
        };

        el.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', init);
        return () => {
            clearTimeout(timer);
            el.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', init);
        };
    }, [n]);

    return (
        <div
            ref={ref}
            className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-3 overflow-x-auto scrollbar-hide sm:gap-4 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible lg:gap-6"
        >
            {items.map(({ copy, ...r }) => (
                <div key={`${copy}-${r.src}`} className={copy === 1 ? 'contents' : 'contents md:hidden'}>
                    <ReelCard {...r} />
                </div>
            ))}
        </div>
    );
}

interface AboutProps {
    breadcrumbs: any;
}

export default function About({ breadcrumbs }: AboutProps) {
    const [activeActivity, setActiveActivity] = useState<number | null>(null);

    const heroImages = [
        '/images/about/about-1.webp',
        '/images/about/about-2.webp',
        '/images/about/about-3.webp',
    ];
    const [heroIndex, setHeroIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000); // ganti foto tiap 5 detik
        return () => clearInterval(timer);
    }, [heroImages.length]);

    const activities = [
        { title: 'BE ACTIVE', desc: 'Talenta muda yang dinamis siap menghadapi tantangan global dengan program pelatihan yang terukur dan berkelanjutan.', img: '/images/activity/activity-1.webp' },
        { title: 'INTENSIVE DRILL', desc: 'Latihan fundamental untuk akurasi dan kontrol bola maksimal, mencakup dribbling, shooting, serta footwork dasar.', img: '/images/activity/activity-2.webp' },
        { title: 'TEAM WORK', desc: 'Membangun chemistry kuat di dalam dan luar lapangan melalui sesi diskusi strategi dan kegiatan bonding.', img: '/images/activity/activity-3.webp' },
        { title: 'GAME READY', desc: 'Kesiapan fisik dan mental untuk level turnamen tertinggi dengan simulasi pertandingan kompetitif.', img: '/images/activity/activity-4.webp' },
    ];

    const architects = [
        { name: 'Fictor Roaring', role: 'Head Coach', img: '/images/team/team-1.webp', quote: 'Disiplin adalah fondasi dari setiap kemenangan besar yang bertahan lama.' },
    ];

    const galleryItems = [...Array(10)].map((_, i) => ({
        img: `/images/scroll/scroll-${(i % 5) + 1}.webp`,
        title: 'National League 2026',
        location: 'DBL Arena, Surabaya',
    }));

    // ⚠️ GANTI angka di bawah ini sesuai data asli akademi
    const statIcon = 'h-7 w-7 md:h-9 md:w-9';
    const achievementStats = [
        { value: '25+', label: 'Total Kejuaraan', icon: <Trophy className={statIcon} /> },
        { value: '12', label: 'Juara 1', icon: <Medal className={statIcon} /> },
        { value: '8', label: 'Juara 2', icon: <Medal className={statIcon} /> },
        { value: '150+', label: 'Atlet Binaan', icon: <Users className={statIcon} /> },
    ];

    // ⚠️ GANTI link dengan akun sosial media asli
    const socialIcon = 'h-5 w-5 md:h-6 md:w-6';
    const socialLinks = [
        { name: 'Instagram', handle: '@roarbasketball_championship', href: 'https://www.instagram.com/roarbasketball_championship/', icon: <Instagram className={socialIcon} /> },
        { name: 'YouTube', handle: 'Roar Basketball Championship', href: 'https://youtube.com/@roarbasketball_championship', icon: <Youtube className={socialIcon} /> },
        { name: 'TikTok', handle: 'Roar Basketball Championship', href: 'https://tiktok.com/@roarbasketball_championship', icon: <Music2 className={socialIcon} /> },
        { name: 'Facebook', handle: 'Roar Basketball Championship', href: 'https://facebook.com/roarbasketball_championship', icon: <Facebook className={socialIcon} /> },
    ];

    return (
        <AppShell variant="header">
            <Head title="About Us | RoarBasketball Championship" />
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header" className="p-0 overflow-x-hidden">
                <div className="bg-[#020617] text-white font-sans selection:bg-orange-500 selection:text-white">

                    {/* SECTION 1: HERO (auto crossfade) */}
                    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-20 md:pb-0 md:pt-0">
                        <div className="absolute inset-0 z-0">
                            {heroImages.map((src, i) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt={`Roar Basketball Hero ${i + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-[1500ms] ease-in-out ${
                                        i === heroIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            ))}
                            {/* Mobile: overlay merata supaya teks terbaca. Desktop: gradient dari kanan */}
                            <div className="absolute inset-0 bg-[#020617]/55 md:hidden"></div>
                            <div className="absolute inset-0 bg-gradient-to-l from-[#020617] via-[#020617]/60 to-transparent hidden md:block"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
                        </div>
                        <div className="container relative z-10 mx-auto grid px-5 sm:px-8 md:grid-cols-2 md:px-12 lg:px-16">
                            <div className="hidden md:block"></div>
                            <div className="flex flex-col items-start justify-center text-left md:items-end md:text-right">
                                <div className="mb-3 overflow-hidden md:mb-4">
                                    <img src="/images/logo/Roar-P.webp" className="h-20 w-auto animate-fade-in-up sm:h-28 md:h-36 lg:h-44" alt="Logo" />
                                </div>
                                <h1 className="mb-5 text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-white sm:text-6xl md:mb-6 md:text-6xl lg:text-8xl">
                                    ROAR<br />
                                    <span className="text-orange-500 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">BASKETBALL</span><br />
                                    <span className="mt-2 block text-xl tracking-[0.12em] text-white sm:mt-3 sm:text-3xl sm:tracking-[0.15em] lg:text-5xl">CHAMPIONSHIP</span>
                                </h1>
                                <div className="mb-5 h-1.5 w-24 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] sm:h-2 sm:w-32 md:mb-6"></div>
                                <p className="max-w-sm text-base font-medium italic leading-relaxed text-gray-200 opacity-90 sm:max-w-md sm:text-lg lg:text-xl">
                                    "Build Character, Gain Skill, Create Legacy." Kami membentuk lebih dari sekadar pemain; kami membangun masa depan bola basket Indonesia.
                                </p>
                            </div>
                        </div>

                        {/* Indikator titik */}
                        <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-24 md:bottom-28">
                            {heroImages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setHeroIndex(i)}
                                    aria-label={`Foto ${i + 1}`}
                                    className="flex h-6 items-center"
                                >
                                    <span
                                        className={`block h-1.5 rounded-full transition-all duration-500 ${
                                            i === heroIndex ? 'w-8 bg-orange-500' : 'w-3 bg-white/40 hover:bg-white/70'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 2: VISION & MISSION */}
                    <section className="relative z-20 -mt-12 rounded-t-[2rem] bg-white py-16 text-slate-900 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] sm:py-20 md:-mt-20 md:rounded-t-[4rem] md:py-28 lg:py-32">
                        <div className="container mx-auto grid max-w-5xl gap-5 px-5 sm:px-8 md:grid-cols-2 md:gap-8">
                            {[
                                { icon: <Target className="h-9 w-9 md:h-11 md:w-11" />, title: 'The Vision', color: 'text-orange-500', desc: 'Menjadi pusat akademi basket paling berpengaruh yang menghasilkan atlet elit berstandar global.' },
                                { icon: <Trophy className="h-9 w-9 md:h-11 md:w-11" />, title: 'Our Mission', color: 'text-blue-600', desc: 'Menggabungkan disiplin tinggi dengan kreativitas basket modern untuk melatih fisik dan intelegensi pemain.' },
                            ].map((item, i) => (
                                <div key={i} className="group rounded-[1.75rem] border border-slate-100 bg-slate-50 p-7 transition-all duration-500 hover:-translate-y-2 hover:bg-slate-900 hover:shadow-2xl sm:p-9 md:rounded-[3rem] md:p-10 md:hover:-translate-y-4 lg:p-12">
                                    <div className={`${item.color} mb-5 transition-all duration-500 group-hover:scale-110 group-hover:text-orange-500 md:mb-8`}>{item.icon}</div>
                                    <h3 className="mb-3 text-xl font-black uppercase italic transition-colors group-hover:text-white sm:text-2xl md:mb-4">{item.title}</h3>
                                    <p className="text-sm font-medium leading-relaxed text-slate-500 transition-colors group-hover:text-slate-400 sm:text-base">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 2B: JUMLAH KEJUARAAN */}
                    <section className="relative overflow-hidden bg-slate-950 py-14 sm:py-20 md:py-28">
                        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl md:h-96 md:w-96"></div>
                        <div className="container relative z-10 mx-auto px-5 sm:px-8">
                            <div className="mb-8 text-center sm:mb-12 md:mb-16">
                                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 sm:text-xs">Track Record</span>
                                <h2 className="mt-2 text-3xl font-black uppercase italic tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                    JEJAK <span className="text-orange-500">KEJUARAAN</span>
                                </h2>
                            </div>
                            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
                                {achievementStats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all duration-500 hover:-translate-y-2 hover:border-orange-500 hover:bg-orange-500 sm:rounded-[2rem] sm:p-6 lg:p-10"
                                    >
                                        <div className="mb-3 flex justify-center text-orange-500 transition-colors group-hover:text-white md:mb-4">
                                            {stat.icon}
                                        </div>
                                        <div className="text-4xl font-black italic leading-none tracking-tighter sm:text-5xl lg:text-7xl">
                                            {stat.value}
                                        </div>
                                        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400 transition-colors group-hover:text-white sm:mt-3 sm:text-[10px] md:text-xs md:tracking-[0.25em]">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: VIDEO SHOWCASE */}
                    <section id="video-section" className="scroll-mt-20 overflow-hidden bg-slate-900 py-14 sm:py-20 md:py-28">
                        <div className="container mx-auto px-5 sm:px-8">
                            <div className="mb-8 text-center sm:mb-12 md:mb-16">
                                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 sm:text-xs">Watch Experience</span>
                                <h2 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                                    MATCH <span className="text-orange-500">HIGHLIGHTS</span>
                                </h2>
                            </div>

                            <ReelCarousel />

                            <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 md:hidden">
                                ← Geser untuk video lainnya →
                            </p>
                        </div>
                    </section>

                    {/* SECTION 4: LIFE AT ROAR */}
                    <section className="bg-white py-14 sm:py-20 md:py-28 lg:py-32">
                        <div className="container mx-auto px-5 sm:px-8">
                            <div className="mb-10 md:mb-16 lg:mb-20">
                                <h2 className="text-4xl font-black uppercase leading-none tracking-tighter text-slate-900 sm:text-5xl lg:text-7xl">
                                    LIFE AT <br /><span className="text-blue-700">ROAR ACADEMY</span>
                                </h2>
                                <div className="mt-5 flex items-center gap-3 sm:gap-4 md:mt-6">
                                    <div className="h-1 w-12 shrink-0 bg-orange-500 md:w-20"></div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-[10px] sm:tracking-[0.3em]">Intensity • Discipline • Family</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:gap-10">
                                {activities.map((item, i) => (
                                    <div key={i} className="group flex cursor-pointer flex-col" onClick={() => setActiveActivity(activeActivity === i ? null : i)}>
                                        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[1.5rem] shadow-lg sm:aspect-[16/9] md:mb-6 md:rounded-[2rem]">
                                            <img src={item.img} loading="lazy" className={`h-full w-full object-cover transition-transform duration-1000 ${activeActivity === i ? 'scale-110' : 'group-hover:scale-110'}`} alt={item.title} />
                                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 sm:p-6 md:p-8">
                                                <h4 className="text-xl font-black uppercase italic text-white drop-shadow-md sm:text-2xl md:text-3xl">{item.title}</h4>
                                            </div>
                                        </div>
                                        <div className="px-1 md:px-2">
                                            <p className={`text-sm font-medium leading-relaxed text-slate-600 transition-all duration-500 sm:text-base md:text-lg ${activeActivity === i ? 'line-clamp-none opacity-100' : 'line-clamp-2 opacity-70 group-hover:opacity-100'}`}>
                                                {item.desc}
                                            </p>
                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">{activeActivity === i ? 'TUTUP' : 'BACA SELENGKAPNYA'}</span>
                                                <ChevronRight size={14} className={`text-orange-500 transition-transform duration-300 ${activeActivity === i ? 'rotate-90' : ''}`} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 5: ADAPTIVE MOMENTS */}
                    <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50 py-14 sm:py-20 md:py-28 lg:py-32">
                        <div className="container mx-auto mb-8 flex items-end justify-between px-5 sm:px-8 md:mb-14 lg:mb-16">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 sm:text-xs">Live Gallery</span>
                                <h2 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900 sm:text-4xl lg:text-5xl">ACADEMY MOMENTS</h2>
                            </div>
                            <div className="mx-12 hidden h-[1px] flex-1 bg-slate-200 lg:block"></div>
                        </div>

                        {/* Tablet & Desktop: Auto-scroll marquee */}
                        <div className="gallery-desktop">
                            <div className="gallery-track">
                                {/* Render 2x untuk seamless loop */}
                                {[...galleryItems, ...galleryItems].map((item, i) => (
                                    <div key={i} className="gallery-card group">
                                        <div className="gallery-card-inner">
                                            <img src={item.img} loading="lazy" className="gallery-img" alt="Moment" />
                                            <div className="gallery-overlay">
                                                <div className="gallery-info">
                                                    <h4 className="gallery-title">{item.title}</h4>
                                                    <p className="gallery-location">{item.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile: Manual swipe */}
                        <div className="gallery-mobile">
                            <div className="gallery-mobile-track">
                                {galleryItems.map((item, i) => (
                                    <div key={i} className="gallery-mobile-card">
                                        <div className="gallery-card-inner">
                                            <img src={item.img} loading="lazy" className="gallery-img" alt="Moment" />
                                            <div className="gallery-overlay">
                                                <div className="gallery-info">
                                                    <h4 className="gallery-title">{item.title}</h4>
                                                    <p className="gallery-location">{item.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="gallery-swipe-hint">
                            <p>← Swipe to explore →</p>
                        </div>
                    </section>

                    {/* SECTION 6: THE ARCHITECTS */}
                    <section className="bg-[#020617] py-16 text-white sm:py-24 md:py-32">
                        <div className="container mx-auto mb-14 flex flex-col items-start justify-between gap-6 border-b border-white/5 px-5 pb-12 sm:px-8 md:mb-24 md:flex-row md:items-end md:gap-10 md:pb-20 lg:mb-32">
                            <h2 className="text-5xl font-black uppercase italic leading-none tracking-tighter sm:text-6xl lg:text-8xl">
                                THE<br /><span className="text-orange-500">ARCHITECTS</span>
                            </h2>
                            <p className="max-w-xs text-left text-[10px] font-bold uppercase italic leading-relaxed tracking-[0.2em] text-gray-500 sm:tracking-[0.3em] md:text-right">
                                Dibalik setiap pemain hebat ada mentor yang tak kenal lelah. Temui tim strategis kami.
                            </p>
                        </div>
                        <div className="container mx-auto space-y-20 px-5 sm:px-8 md:space-y-32 lg:space-y-48">
                            {architects.map((staff, idx) => (
                                <div key={idx} className={`flex flex-col items-center gap-10 md:flex-row md:gap-16 lg:gap-32 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="group relative aspect-[4/5] w-full max-w-sm md:w-[40%] md:max-w-none">
                                        <div className="absolute -inset-2 rounded-3xl border border-orange-500/20 transition-all duration-500 group-hover:inset-0 sm:-inset-4"></div>
                                        <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                                            <img src={staff.img} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={staff.name} />
                                        </div>
                                    </div>
                                    <div className={`flex w-full flex-1 flex-col items-start text-left ${idx % 2 !== 0 ? '' : 'md:items-end md:text-right'}`}>
                                        <Zap className="mb-4 animate-pulse text-orange-500 md:mb-6" />
                                        <span className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-orange-500 sm:text-sm md:mb-4 md:tracking-[0.5em]">{staff.role}</span>
                                        <h3 className="mb-6 text-4xl font-black uppercase italic leading-none tracking-tighter sm:text-5xl md:mb-8 lg:text-7xl">{staff.name}</h3>
                                        <div className={`mb-6 h-1.5 w-20 bg-white md:mb-8 md:w-24 ${idx % 2 !== 0 ? '' : 'md:ml-auto'}`}></div>
                                        <p className="max-w-lg text-lg font-medium italic leading-snug text-gray-400 sm:text-xl lg:text-3xl">"{staff.quote}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 7: CONTACT + SOSIAL MEDIA */}
                    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24">
                        <div className="absolute inset-0 z-0">
                            <img src="/images/home/slide-2.webp" loading="lazy" className="h-full w-full object-cover grayscale" alt="Contact BG" />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 via-slate-900/90 to-slate-900"></div>
                        </div>
                        <div className="container relative z-10 mx-auto mb-14 px-5 sm:px-8 md:mb-24 md:px-12 lg:mb-32 lg:px-16">
                            <div className="max-w-3xl">
                                <h2 className="mb-8 text-5xl font-black uppercase italic leading-none tracking-tighter text-white sm:text-7xl md:mb-10 lg:text-9xl">
                                    JOIN THE<br /><span className="text-orange-500">TRIBE.</span>
                                </h2>
                                <div className="mb-8 space-y-3 border-l-4 border-orange-500 pl-5 text-base font-medium italic text-white sm:pl-8 sm:text-lg md:mb-12 md:space-y-4 md:text-xl">
                                    <p>Ancol Hoops</p>
                                    <p>Jl. Karang Bolong Raya No. 8, Ancol, Pademangan, Jakarta Utara 14430</p>
                                    <p className="pt-2 md:pt-4">
                                        <a href="tel:+6282266229901" className="text-2xl font-black not-italic text-orange-400 hover:text-orange-300 sm:text-3xl md:text-4xl">
                                            (+62) 822-6622-9901
                                        </a>
                                    </p>
                                </div>

                                {/* Sosial Media */}
                                <div className="mb-8 md:mb-12">
                                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 md:mb-5">Ikuti Kami</p>
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                                        {socialLinks.map((s) => (
                                            <a
                                                key={s.name}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={s.name}
                                                className="group flex min-w-0 flex-col gap-2 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500 md:gap-3 md:p-5"
                                            >
                                                <span className="text-orange-400 transition-colors group-hover:text-white">{s.icon}</span>
                                                <span className="min-w-0">
                                                    <span className="block text-xs font-black uppercase italic text-white sm:text-sm">{s.name}</span>
                                                    <span className="block truncate text-[11px] font-medium text-white/60 group-hover:text-white/90 sm:text-xs">{s.handle}</span>
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    href="/program/member"
                                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-blue-700 px-8 py-4 text-lg font-black uppercase italic text-white shadow-2xl transition-all hover:bg-orange-500 sm:w-auto sm:px-12 sm:py-5 sm:text-xl md:gap-4 md:px-16 md:py-6 md:text-2xl"
                                >
                                    Start Your Journey
                                    <ChevronRight className="transition-transform group-hover:translate-x-2" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 8: INFO BAR */}
                    <div className="relative z-20 border-b border-slate-100 bg-white py-8 md:py-12">
                        <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center md:gap-8">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="shrink-0 rounded-2xl bg-slate-100 p-3 text-blue-700 md:p-4"><MapPin className="h-6 w-6 md:h-8 md:w-8" /></div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Our Basecamp</span>
                                    <h4 className="text-base font-black uppercase italic text-slate-900 sm:text-lg md:text-xl">Ancol Hoops, Jakarta - Indonesia</h4>
                                </div>
                            </div>
                            <div className="hidden h-12 w-[1px] bg-slate-200 md:block"></div>
                            <div className="w-full border-t border-slate-100 pt-5 text-left md:w-auto md:border-0 md:pt-0 md:text-right">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Training Hours</span>
                                <h4 className="text-base font-black uppercase italic text-slate-800 sm:text-lg md:text-xl">Mon - Sun: 08:00 AM - 09:00 PM</h4>
                            </div>
                        </div>
                    </div>

                    <section className="relative h-[320px] w-full border-t-8 border-orange-500 sm:h-[420px] lg:h-[600px]">
                        <iframe
                            src="https://www.google.com/maps?q=Ancol%20Hoops%2C%20Jakarta&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Roar Basketball"
                            className="h-full w-full grayscale-[50%] transition-all duration-1000 hover:grayscale-0"
                        />
                        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"></div>
                    </section>

                    <Footer />
                </div>
            </AppContent>

            <style dangerouslySetInnerHTML={{ __html: `

                /* ============================================================
                   SECTION 5: GALLERY — Tablet/Desktop auto-scroll / Mobile manual
                   Ukuran kartu fluid memakai clamp() agar pas di semua layar.
                ============================================================ */

                /* --- Desktop wrapper (hidden on mobile) --- */
                .gallery-desktop {
                    display: none;
                    width: 100%;
                    overflow: hidden;
                }

                /* --- Desktop track: animasi marquee --- */
                /* Jarak antar kartu pakai padding (bukan gap) supaya loop -50% mulus tanpa loncat */
                .gallery-track {
                    display: flex;
                    width: max-content;
                    animation: marquee 45s linear infinite;
                }
                .gallery-track:hover {
                    animation-play-state: paused;
                }

                /* --- Desktop card --- */
                .gallery-card {
                    flex-shrink: 0;
                    width: clamp(280px, 38vw, 450px);
                    padding-right: clamp(1rem, 2vw, 2rem);
                    box-sizing: content-box;
                    position: relative;
                }
                .gallery-card-inner {
                    position: relative;
                    overflow: hidden;
                    border-radius: clamp(1.25rem, 2vw, 2rem);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                    transform: perspective(1000px) rotateY(-10deg);
                    transition: transform 0.7s ease;
                }
                .gallery-card:hover .gallery-card-inner {
                    transform: perspective(1000px) rotateY(0deg);
                }

                /* --- Mobile wrapper (hidden on desktop) --- */
                .gallery-mobile {
                    display: flex;
                    width: 100%;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    -webkit-overflow-scrolling: touch;
                    padding: 0 1.25rem;
                    scroll-padding: 0 1.25rem;
                    box-sizing: border-box;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .gallery-mobile::-webkit-scrollbar {
                    display: none;
                }

                /* --- Mobile track --- */
                .gallery-mobile-track {
                    display: flex;
                    gap: 1rem;
                    width: max-content;
                    padding-right: 1.25rem;
                }

                /* --- Mobile card --- */
                .gallery-mobile-card {
                    flex-shrink: 0;
                    width: min(82vw, 360px);
                    scroll-snap-align: center;
                    position: relative;
                }
                .gallery-mobile-card .gallery-card-inner {
                    transform: none;
                    border-radius: 1.5rem;
                }
                .gallery-mobile-card:hover .gallery-card-inner {
                    transform: none;
                }

                /* --- Shared image & overlay --- */
                .gallery-img {
                    width: 100%;
                    height: clamp(220px, 26vw, 340px);
                    object-fit: cover;
                    transition: transform 1s ease;
                    display: block;
                }
                .gallery-mobile-card .gallery-img {
                    height: clamp(230px, 62vw, 300px);
                }
                .gallery-card:hover .gallery-img,
                .gallery-mobile-card:hover .gallery-img {
                    transform: scale(1.1);
                }
                .gallery-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
                    display: flex;
                    align-items: flex-end;
                }
                .gallery-info {
                    padding: clamp(1rem, 2.2vw, 2rem);
                }
                .gallery-title {
                    color: #fff;
                    font-weight: 900;
                    font-style: italic;
                    text-transform: uppercase;
                    font-size: clamp(1rem, 1.8vw, 1.25rem);
                    margin: 0 0 0.25rem 0;
                }
                .gallery-location {
                    color: #fb923c;
                    font-size: 0.625rem;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    margin: 0;
                }

                /* --- Swipe hint (mobile only) --- */
                .gallery-swipe-hint {
                    display: block;
                    margin-top: 1.5rem;
                    text-align: center;
                }
                .gallery-swipe-hint p {
                    color: #94a3b8;
                    font-size: 0.625rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;
                    margin: 0;
                }

                /* ============================================================
                   RESPONSIVE BREAKPOINT
                ============================================================ */
                @media (min-width: 768px) {
                    .gallery-desktop  { display: block; }
                    .gallery-mobile   { display: none; }
                    .gallery-swipe-hint { display: none; }
                }

                /* Layar sentuh: matikan efek 3D miring supaya tidak "nempel" setelah tap */
                @media (hover: none) {
                    .gallery-card-inner { transform: none; }
                }

                /* ============================================================
                   KEYFRAMES
                ============================================================ */
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes slow-zoom {
                    0%   { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s ease-in-out infinite alternate;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.4; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .gallery-track, .animate-slow-zoom, .animate-fade-in-up, .gallery-swipe-hint p { animation: none; }
                }

                /* --- Scrollbar hide global --- */
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </AppShell>
    );
}