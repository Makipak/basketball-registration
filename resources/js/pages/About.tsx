import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { Footer } from '@/components/footer';
import { Head } from '@inertiajs/react';
import {
    PlayCircle,
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

interface AboutProps {
    breadcrumbs: any;
}

export default function About({ breadcrumbs }: AboutProps) {
    const [activeActivity, setActiveActivity] = useState<number | null>(null);

    
    const heroImages = [
        '/images/about/about-1.jpg',
        '/images/about/about-2.jpg',
        '/images/about/about-3.jpg',
    ];
    const [heroIndex, setHeroIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000); // ganti foto tiap 5 detik
        return () => clearInterval(timer);
    }, [heroImages.length]);

    const activities = [
        { title: 'BE ACTIVE', desc: 'Talenta muda yang dinamis siap menghadapi tantangan global dengan program pelatihan yang terukur dan berkelanjutan.', img: '/images/activity/activity-1.jpeg' },
        { title: 'INTENSIVE DRILL', desc: 'Latihan fundamental untuk akurasi dan kontrol bola maksimal, mencakup dribbling, shooting, serta footwork dasar.', img: '/images/activity/activity-2.jpg' },
        { title: 'TEAM WORK', desc: 'Membangun chemistry kuat di dalam dan luar lapangan melalui sesi diskusi strategi dan kegiatan bonding.', img: '/images/activity/activity-3.jpg' },
        { title: 'GAME READY', desc: 'Kesiapan fisik dan mental untuk level turnamen tertinggi dengan simulasi pertandingan kompetitif.', img: '/images/activity/activity-4.jpg' },
    ];

    const architects = [
        { name: 'Fictor Roaring', role: 'Head Coach', img: '/images/team/team-1.jpg', quote: 'Disiplin adalah fondasi dari setiap kemenangan besar yang bertahan lama.' },
    ];

    const galleryItems = [...Array(10)].map((_, i) => ({
        img: `/images/scroll/scroll-${(i % 5) + 1}.jpg`,
        title: 'National League 2026',
        location: 'DBL Arena, Surabaya',
    }));

    // ⚠️ GANTI angka di bawah ini sesuai data asli akademi
    const achievementStats = [
        { value: '25+', label: 'Total Kejuaraan', icon: <Trophy size={32} /> },
        { value: '12', label: 'Juara 1', icon: <Medal size={32} /> },
        { value: '8', label: 'Juara 2', icon: <Medal size={32} /> },
        { value: '150+', label: 'Atlet Binaan', icon: <Users size={32} /> },
    ];

    // ⚠️ GANTI link dengan akun sosial media asli
    const socialLinks = [
        { name: 'Instagram', handle: '@roarbasketball', href: 'https://instagram.com/roarbasketball', icon: <Instagram size={24} /> },
        { name: 'YouTube', handle: 'Roar Basketball', href: 'https://youtube.com/@roarbasketball', icon: <Youtube size={24} /> },
        { name: 'TikTok', handle: '@roarbasketball', href: 'https://tiktok.com/@roarbasketball', icon: <Music2 size={24} /> },
        { name: 'Facebook', handle: 'Roar Basketball', href: 'https://facebook.com/roarbasketball', icon: <Facebook size={24} /> },
    ];

    return (
        <AppShell variant="header">
            <Head title="About Us | RoarBasketball" />
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header" className="p-0 overflow-x-hidden">
                <div className="bg-[#020617] text-white font-sans selection:bg-orange-500 selection:text-white">

                    {/* SECTION 1: HERO (auto crossfade) */}
                    <section className="relative h-screen flex items-center overflow-hidden">
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
                            <div className="absolute inset-0 bg-gradient-to-l from-[#020617] via-[#020617]/60 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
                        </div>
                        <div className="container mx-auto px-6 md:px-16 relative z-10 grid md:grid-cols-2">
                            <div className="hidden md:block"></div>
                            <div className="text-left md:text-right flex flex-col items-start md:items-end justify-center">
                                <div className="overflow-hidden mb-4">
                                    <img src="/images/logo/Roar-P.png" className="h-28 md:h-44 w-auto animate-fade-in-up" alt="Logo" />
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] text-white mb-6">
                                    ROAR<br />
                                    <span className="text-orange-500 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">BASKETBALL</span>
                                </h1>
                                <div className="h-2 w-32 bg-orange-500 mb-6 shadow-[0_0_20px_rgba(249,115,22,0.6)]"></div>
                                <p className="max-w-md text-gray-200 text-lg md:text-xl font-medium leading-relaxed italic opacity-90">
                                    "Build Character, Gain Skill, Create Legacy." Kami membentuk lebih dari sekadar pemain; kami membangun masa depan bola basket Indonesia.
                                </p>
                            </div>
                        </div>

                        {/* Indikator titik */}
                        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                            {heroImages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setHeroIndex(i)}
                                    aria-label={`Foto ${i + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${
                                        i === heroIndex ? 'w-8 bg-orange-500' : 'w-3 bg-white/40 hover:bg-white/70'
                                    }`}
                                />
                            ))}
                        </div>
                    </section>

                    {/* SECTION 2: VISION & MISSION (Community dihapus) */}
                    <section className="py-32 bg-white text-slate-900 rounded-t-[4rem] -mt-20 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
                        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 max-w-5xl">
                            {[
                                { icon: <Target size={44} />, title: "The Vision", color: "text-orange-500", desc: "Menjadi pusat akademi basket paling berpengaruh yang menghasilkan atlet elit berstandar global." },
                                { icon: <Trophy size={44} />, title: "Our Mission", color: "text-blue-600", desc: "Menggabungkan disiplin tinggi dengan kreativitas basket modern untuk melatih fisik dan intelegensi pemain." },
                            ].map((item, i) => (
                                <div key={i} className="group p-12 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
                                    <div className={`${item.color} mb-8 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-500`}>{item.icon}</div>
                                    <h3 className="text-2xl font-black uppercase italic mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed font-medium transition-colors">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 2B: JUMLAH KEJUARAAN */}
                    <section className="py-20 md:py-28 bg-slate-950 relative overflow-hidden">
                        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="container mx-auto px-6 relative z-10">
                            <div className="mb-12 md:mb-16 text-center">
                                <span className="text-orange-500 font-black text-xs uppercase tracking-widest">Track Record</span>
                                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-2">
                                    JEJAK <span className="text-orange-500">KEJUARAAN</span>
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                {achievementStats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="group p-6 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 transition-all duration-500 hover:-translate-y-2 text-center"
                                    >
                                        <div className="text-orange-500 group-hover:text-white flex justify-center mb-4 transition-colors">
                                            {stat.icon}
                                        </div>
                                        <div className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">
                                            {stat.value}
                                        </div>
                                        <p className="mt-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-gray-400 group-hover:text-white transition-colors">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: VIDEO SHOWCASE */}
                    <section id="video-section" className="py-24 bg-slate-900 scroll-mt-20 overflow-hidden">
                        <div className="container mx-auto px-6">
                            <div className="relative aspect-video rounded-[4rem] overflow-hidden group ring-1 ring-white/10 shadow-2xl cursor-pointer">
                                <img src="/images/video-thumb.jpg" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt="Video Thumbnail" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-20 group-hover:opacity-60 animate-pulse"></div>
                                        <button className="relative bg-orange-500 text-white w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" aria-label="Putar video">
                                            <PlayCircle size={60} fill="currentColor" />
                                        </button>
                                    </div>
                                    <span className="mt-8 text-white font-black uppercase tracking-[0.6em] text-[10px] opacity-40 group-hover:opacity-100 transition-opacity">Watch Experience</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: LIFE AT ROAR */}
                    <section className="bg-white py-20 md:py-32">
                        <div className="container mx-auto px-6">
                            <div className="mb-12 md:mb-20">
                                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                                    LIFE AT <br /><span className="text-blue-700">ROAR ACADEMY</span>
                                </h2>
                                <div className="flex items-center gap-4 mt-6">
                                    <div className="h-1 w-16 md:w-20 bg-orange-500"></div>
                                    <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Intensity • Discipline • Family</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
                                {activities.map((item, i) => (
                                    <div key={i} className="group flex flex-col cursor-pointer" onClick={() => setActiveActivity(activeActivity === i ? null : i)}>
                                        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-lg mb-6">
                                            <img src={item.img} className={`w-full h-full object-cover transition-transform duration-1000 ${activeActivity === i ? 'scale-110' : 'group-hover:scale-110'}`} alt={item.title} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                                <h4 className="text-2xl md:text-3xl font-black uppercase italic text-white drop-shadow-md">{item.title}</h4>
                                            </div>
                                        </div>
                                        <div className="px-2">
                                            <p className={`text-slate-600 text-base md:text-lg font-medium leading-relaxed transition-all duration-500 ${activeActivity === i ? 'line-clamp-none opacity-100' : 'line-clamp-2 opacity-70 group-hover:opacity-100'}`}>
                                                {item.desc}
                                            </p>
                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em]">{activeActivity === i ? 'TUTUP' : 'BACA SELENGKAPNYA'}</span>
                                                <ChevronRight size={14} className={`text-orange-500 transition-transform duration-300 ${activeActivity === i ? 'rotate-90' : ''}`} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 5: ADAPTIVE MOMENTS */}
                    <section className="py-20 md:py-32 bg-slate-50 overflow-hidden relative border-y border-slate-200">
                        <div className="container mx-auto px-6 mb-12 md:mb-16 flex justify-between items-end">
                            <div>
                                <span className="text-orange-500 font-black text-xs uppercase tracking-widest">Live Gallery</span>
                                <h2 className="text-4xl md:text-5xl font-black uppercase italic text-slate-900 tracking-tighter mt-2">ACADEMY MOMENTS</h2>
                            </div>
                            <div className="hidden md:block h-[1px] flex-1 mx-12 bg-slate-200"></div>
                        </div>

                        {/* Desktop: Auto-scroll marquee */}
                        <div className="gallery-desktop">
                            <div className="gallery-track">
                                {/* Render 2x untuk seamless loop */}
                                {[...galleryItems, ...galleryItems].map((item, i) => (
                                    <div key={i} className="gallery-card group">
                                        <div className="gallery-card-inner">
                                            <img src={item.img} className="gallery-img" alt="Moment" />
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
                                            <img src={item.img} className="gallery-img" alt="Moment" />
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
                    <section className="bg-[#020617] text-white py-32">
                        <div className="container mx-auto px-6 mb-32 border-b border-white/5 pb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                            <h2 className="text-6xl md:text-8xl font-black uppercase italic leading-none tracking-tighter">
                                THE<br /><span className="text-orange-500">ARCHITECTS</span>
                            </h2>
                            <p className="text-gray-500 max-w-xs text-left md:text-right font-bold uppercase tracking-[0.3em] text-[10px] leading-relaxed italic">
                                Dibalik setiap pemain hebat ada mentor yang tak kenal lelah. Temui tim strategis kami.
                            </p>
                        </div>
                        <div className="container mx-auto px-6 space-y-48">
                            {architects.map((staff, idx) => (
                                <div key={idx} className={`flex flex-col md:flex-row items-center gap-16 md:gap-32 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="w-full md:w-[40%] aspect-[4/5] relative group">
                                        <div className="absolute -inset-4 border border-orange-500/20 rounded-3xl group-hover:inset-0 transition-all duration-500"></div>
                                        <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                                            <img src={staff.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={staff.name} />
                                        </div>
                                    </div>
                                    <div className={`flex-1 flex flex-col ${idx % 2 !== 0 ? 'items-start' : 'md:items-end md:text-right'}`}>
                                        <Zap className="text-orange-500 mb-6 animate-pulse" />
                                        <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-sm mb-4">{staff.role}</span>
                                        <h3 className="text-5xl md:text-7xl font-black uppercase italic leading-none mb-8 tracking-tighter">{staff.name}</h3>
                                        <div className={`h-1.5 w-24 bg-white mb-8 ${idx % 2 !== 0 ? '' : 'md:ml-auto'}`}></div>
                                        <p className="text-xl md:text-3xl text-gray-400 font-medium italic leading-tight max-w-lg">"{staff.quote}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 7: CONTACT + SOSIAL MEDIA */}
                    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img src="/images/home/slide-2.jpg" className="w-full h-full object-cover grayscale" alt="Contact BG" />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 via-slate-900/90 to-slate-900"></div>
                        </div>
                        <div className="container mx-auto px-6 md:px-16 relative z-10 mb-32">
                            <div className="max-w-3xl">
                                <h2 className="text-7xl md:text-9xl font-black uppercase italic leading-none text-white mb-10 tracking-tighter">
                                    JOIN THE<br /><span className="text-orange-500">TRIBE.</span>
                                </h2>
                                <div className="text-white space-y-4 text-xl font-medium mb-12 border-l-4 border-orange-500 pl-8 italic">
                                    <p>Ancol Hoops</p>
                                    <p>Jl. Karang Bolong Raya No. 8, Ancol, Pademangan, Jakarta Utara 14430</p>
                                    <p className="pt-4 text-4xl font-black text-orange-400 not-italic">
                                        (+62) 822-6622-9901
                                    </p>
                                </div>

                                {/* Sosial Media */}
                                <div className="mb-12">
                                    <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px] mb-5">Ikuti Kami</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {socialLinks.map((s) => (
                                            <a
                                                key={s.name}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={s.name}
                                                className="group flex flex-col gap-3 p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <span className="text-orange-400 group-hover:text-white transition-colors">{s.icon}</span>
                                                <span>
                                                    <span className="block text-white font-black uppercase italic text-sm">{s.name}</span>
                                                    <span className="block text-white/60 group-hover:text-white/90 text-xs font-medium truncate">{s.handle}</span>
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <button className="bg-blue-700 hover:bg-orange-500 text-white px-16 py-6 rounded-full font-black text-2xl uppercase italic transition-all shadow-2xl flex items-center gap-4 group">
                                    Start Your Journey
                                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 8: INFO BAR */}
                    <div className="bg-white py-12 border-b border-slate-100 relative z-20">
                        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-6">
                                <div className="bg-slate-100 p-4 rounded-2xl text-blue-700"><MapPin size={32} /></div>
                                <div>
                                    <span className="text-orange-500 font-black uppercase tracking-widest text-[10px]">Our Basecamp</span>
                                    <h4 className="text-slate-900 font-black text-xl italic uppercase">Ancol Hoops, Jakarta - Indonesia</h4>
                                </div>
                            </div>
                            <div className="h-12 w-[1px] bg-slate-200 hidden md:block"></div>
                            <div className="text-center md:text-right">
                                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Training Hours</span>
                                <h4 className="text-slate-800 font-black text-xl italic uppercase">Mon - Sun: 08:00 AM - 09:00 PM</h4>
                            </div>
                        </div>
                    </div>

                    <section className="h-[600px] w-full relative border-t-8 border-orange-500">
                        <iframe
                            src="https://www.google.com/maps?q=Ancol%20Hoops%2C%20Jakarta&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Roar Basketball"
                            className="w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"></div>
                    </section>

                    <Footer />
                </div>
            </AppContent>

            <style dangerouslySetInnerHTML={{ __html: `

                /* ============================================================
                   SECTION 5: GALLERY — Desktop auto-scroll / Mobile manual
                ============================================================ */

                /* --- Desktop wrapper (hidden on mobile) --- */
                .gallery-desktop {
                    display: none;
                    width: 100%;
                    overflow: hidden;
                }

                /* --- Desktop track: animasi marquee --- */
                .gallery-track {
                    display: flex;
                    gap: 2rem;
                    width: max-content;
                    animation: marquee 40s linear infinite;
                }
                .gallery-track:hover {
                    animation-play-state: paused;
                }

                /* --- Desktop card --- */
                .gallery-card {
                    flex-shrink: 0;
                    width: 450px;
                    position: relative;
                }
                .gallery-card-inner {
                    position: relative;
                    overflow: hidden;
                    border-radius: 2rem;
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
                    padding: 0 1.5rem;
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
                    gap: 1.5rem;
                    width: max-content;
                }

                /* --- Mobile card --- */
                .gallery-mobile-card {
                    flex-shrink: 0;
                    width: 85vw;
                    scroll-snap-align: center;
                    position: relative;
                }
                .gallery-mobile-card .gallery-card-inner {
                    transform: none;
                }
                .gallery-mobile-card:hover .gallery-card-inner {
                    transform: none;
                }

                /* --- Shared image & overlay --- */
                .gallery-img {
                    width: 100%;
                    height: 320px;
                    object-fit: cover;
                    transition: transform 1s ease;
                    display: block;
                }
                .gallery-mobile-card .gallery-img {
                    height: 288px;
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
                    padding: 2rem;
                }
                .gallery-title {
                    color: #fff;
                    font-weight: 900;
                    font-style: italic;
                    text-transform: uppercase;
                    font-size: 1.25rem;
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
                    margin-top: 2rem;
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
                    .gallery-track, .animate-slow-zoom, .animate-fade-in-up { animation: none; }
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