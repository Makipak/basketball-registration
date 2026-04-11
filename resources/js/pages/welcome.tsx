import React, { useState, useEffect } from 'react'; 
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { Footer } from '@/components/footer';
import type { AppLayoutProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    Trophy, 
    ArrowRight, 
    Star, 
    MapPin, 
    PlayCircle,
    CheckCircle2,
    Zap,
    ChevronRight
} from 'lucide-react';

export default function Welcome({ breadcrumbs }: AppLayoutProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        '/images/home/slide-1.jpg',
        '/images/home/slide-2.jpg', 
        '/images/home/slide-3.jpg'  
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

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

                    {/* 2. PROGRAMS SECTION */}
                    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div>
                                <h2 className="text-orange-500 font-black uppercase tracking-[0.2em] text-[10px] mb-3 italic">Our Programs</h2>
                                <h3 className="text-4xl md:text-6xl font-black text-[#020617] uppercase tracking-tighter italic leading-none">
                                    Pilih Kelas <span className="text-[#0056b3]">Impian</span>
                                </h3>
                            </div>
                            <Link href="/program" className="text-[#0056b3] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-orange-500 transition-colors group">
                                Semua Program <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Junior Elite', age: 'U-12 to U-15', img: '/images/kelas/junior.jpg', price: 'Rp 450rb/bln' },
                                { title: 'Pro Prospect', age: 'U-16 to U-21', img: '/images/kelas/pro.jpg', price: 'Rp 600rb/bln' },
                                { title: 'Private Camp', age: 'All Ages', img: '/images/kelas/privatecamp.jpg', price: 'Mulai 200rb' }
                            ].map((prog, i) => (
                                <div key={i} className="group bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-[#0056b3]/20 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#0056b3]/5">
                                    <div className="h-72 overflow-hidden relative">
                                        <img src={prog.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={prog.title} />
                                        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black text-[#0056b3] uppercase tracking-widest shadow-sm">
                                            {prog.age}
                                        </div>
                                    </div>
                                    <div className="p-10">
                                        <h4 className="text-2xl font-black text-[#020617] uppercase mb-3 tracking-tighter italic">{prog.title}</h4>
                                        <p className="text-slate-500 text-sm mb-8 font-medium leading-relaxed">Pelatihan intensif dengan fokus pada teknik fundamental dan strategi tim secara modern.</p>
                                        <div className="flex justify-between items-center border-t border-slate-200 pt-6">
                                            <span className="text-[#020617] font-black text-lg tracking-tight">{prog.price}</span>
                                            <Link href="/program/member" className="text-[#0056b3] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:text-orange-500 transition-colors">
                                                Daftar <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. LATEST NEWS - Gritty Sporty Style */}
                    <section className="py-32 bg-[#020617] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0056b3]/10 rounded-full blur-[120px] pointer-events-none" />
                        
                        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                <div className="lg:col-span-9">
                                    <div className="flex items-center gap-4 mb-20">
                                        <div className="h-2 w-16 bg-orange-500 italic"></div>
                                        <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter italic">
                                            LATEST <span className="text-orange-500 underline decoration-white/10 decoration-4 underline-offset-8">NEWS</span>
                                        </h2>
                                    </div>
                                    
                                    <div className="grid gap-16">
                                        {[1, 2].map((_, i) => (
                                            <div key={i} className="flex flex-col md:flex-row gap-10 group cursor-pointer">
                                                <div className="md:w-[420px] h-[280px] overflow-hidden shrink-0 relative border border-white/5 bg-slate-900 rounded-2xl">
                                                    <img 
                                                        src={`/images/news/news-${i+1}.jpg`} 
                                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                                                        alt="News" 
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
                                                </div>
                                                
                                                <div className="flex flex-col justify-center">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <span className="bg-[#0056b3] text-white font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 italic">
                                                            TOURNAMENT
                                                        </span>
                                                        <span className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                                                            APRIL 12, 2026
                                                        </span>
                                                    </div>
                                                    
                                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-5 group-hover:text-orange-400 transition-colors leading-[1] tracking-tighter italic uppercase">
                                                        Persiapan Menuju National <br className="hidden md:block"/> Championship 2026
                                                    </h3>
                                                    
                                                    <p className="text-gray-400 text-base font-medium leading-relaxed max-w-2xl border-l-2 border-[#0056b3] pl-6 italic">
                                                        Tim Roring Basketball mulai melakukan seleksi ketat untuk mewakili regional dalam ajang bergengsi bulan depan...
                                                    </p>
                                                    
                                                    <div className="mt-8 flex items-center gap-3 text-white font-black uppercase text-[10px] tracking-[0.3em] group-hover:text-orange-500 transition-all">
                                                        <span className="h-[1px] w-8 bg-orange-500 group-hover:w-12 transition-all"></span>
                                                        READ FULL STORY
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="lg:col-span-3 hidden lg:block">
                                    <div className="sticky top-32 border-l border-white/5 pl-8">
                                        <h4 className="text-orange-500 font-black uppercase tracking-widest text-xs mb-8 italic">Categories</h4>
                                        <ul className="space-y-6">
                                            {['Training', 'Events', 'Achievement', 'Community'].map((cat) => (
                                                <li key={cat} className="text-gray-500 hover:text-[#0056b3] text-[11px] font-black uppercase tracking-widest cursor-pointer transition-colors flex items-center gap-2 group">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#0056b3] transition-all"></div>
                                                    {cat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
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