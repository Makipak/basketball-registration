import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { Footer } from '@/components/footer';
import { Head } from '@inertiajs/react';
import { Instagram, Twitter, Trophy, Target, Zap, ShieldCheck } from 'lucide-react';

export default function Coach({ breadcrumbs }: { breadcrumbs: any }) {
    const coaches = [
        {
            name: 'Fictor Roaring',
            role: 'Head Coach',
            specialization: 'Tactical Strategy',
            img: '/images/coach/coach-1.webp',
            experience: '15+ Years',
            bio: 'Disiplin bukan pilihan, tapi pondasi. Kami mencetak pemenang, bukan sekadar pemain.'
        },
        {
            name: 'M. Gofar',
            role: 'Jabatan',
            specialization: 'Skill Development',
            img: '/images/coach/coach-1.webp',
            experience: '8 Years',
            bio: 'Detail kecil di lapangan menentukan perbedaan antara pemain bagus dan pemain hebat.'
        },
        {
            name: 'Faisal J Ahmad',
            role: 'Jabatan',
            specialization: 'Mental Toughness',
            img: '/images/coach/coach-1.webp',
            experience: '12 Years',
            bio: 'Mentalitas adalah 90% dari permainan. Jika pikiranmu kuat, tubuhmu akan mengikuti.'
        },
        {
            name: 'Amin Prihantono',
            role: 'Jabatan',
            specialization: 'Athlete Branding',
            img: '/images/coach/coach-1.webp',
            experience: '6 Years',
            bio: 'Profesionalisme di luar lapangan sama pentingnya dengan performa di dalam ring.'
        },
        {
            name: 'Fredy L W',
            role: 'Jabatan',
            specialization: 'Playmaking & Shooting',
            img: '/images/coach/coach-1.webp',
            experience: '10 Years',
            bio: 'Visi lapangan dan akurasi adalah senjata utama. Kami ajarkan cara membaca permainan.'
        },
        {
            name: '⁠Randy Putrama',
            role: 'Jabatan',
            specialization: 'Physicality & Drive',
            img: '/images/coach/coach-1.webp',
            experience: '11 Years',
            bio: 'Kekuatan fisik dan determinasi untuk menyerang paint area adalah kunci kemenangan.'
        }
    ];

    return (
        <AppShell variant="header">
            <Head title="Our Coaches | RoringBasketball" />
            <AppHeader breadcrumbs={breadcrumbs} />
            
            <AppContent variant="header" className="p-0 overflow-x-hidden">
                <div className="font-sans selection:bg-orange-500">
                    
                    {/* 1. HERO SECTION */}
                    <section className="bg-[#0056b3] relative pt-16 pb-20 border-b border-white/5">
                        <div className="container mx-auto px-6 relative z-10">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="h-[1px] w-8 bg-orange-500"></div>
                                    <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[9px]">
                                        Technical Staff
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                                    THE <span className="text-orange-400">ARCHITECTS</span>
                                </h1>

                                <div className="mt-4 max-w-lg">
                                    <p className="text-blue-100 text-xs md:text-sm leading-relaxed font-medium uppercase tracking-wider italic opacity-80">
                                        Sistem kepelatihan terintegrasi untuk membangun fundamental 
                                        dan intelegensi pemain di level tertinggi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. COACHES LIST */}
                    <section className="py-32 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
                                {coaches.map((coach, idx) => (
                                    <div key={idx} className="group flex flex-col">
                                        {/* Image Box */}
                                        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 mb-8 rounded-sm shadow-xl">
                                            <img 
                                                src={coach.img} 
                                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                                                alt={coach.name} 
                                            />
                                            {/* Overlay subtle */}
                                            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-all duration-500"></div>
                                            
                                            {/* Experience Badge */}
                                            <div className="absolute bottom-6 left-6">
                                                <span className="bg-orange-500 text-white font-black italic uppercase text-[10px] px-4 py-2 tracking-widest shadow-2xl">
                                                    EXP: {coach.experience}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="px-2">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="h-[1px] w-8 bg-orange-500"></div>
                                                <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[9px]">{coach.role}</span>
                                            </div>
                                            
                                            <h3 className="text-3xl font-black uppercase italic text-slate-900 leading-none mb-4 group-hover:text-[#0056b3] transition-colors">
                                                {coach.name}
                                            </h3>
                                            
                                            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium italic h-12 line-clamp-2">
                                                "{coach.bio}"
                                            </p>
                                            
                                            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                                <div className="flex items-center gap-2 text-slate-900">
                                                    <Zap size={14} className="text-orange-500 animate-pulse" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">{coach.specialization}</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <a href="#" className="transform hover:scale-125 transition-transform">
                                                        <Instagram size={18} className="text-slate-300 hover:text-orange-500" />
                                                    </a>
                                                    <a href="#" className="transform hover:scale-125 transition-transform">
                                                        <Twitter size={18} className="text-slate-300 hover:text-blue-500" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 3. PHILOSOPHY SECTION (FOOTER BRIDGE) */}
                    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                        <div className="container mx-auto px-6 flex flex-col items-center text-center">
                            <Trophy className="text-orange-500 mb-6" size={48} />
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6">
                                More Than Just <span className="text-orange-500">Basketball</span>
                            </h2>
                            <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed font-medium">
                                Kami percaya bahwa lapangan basket adalah tempat terbaik untuk belajar tentang kerja keras, 
                                kerja sama tim, dan ketangguhan mental yang akan berguna sepanjang hidup.
                            </p>
                        </div>
                        {/* Background Text Accent */}
                        <div className="absolute -bottom-10 -right-10 text-9xl font-black text-white/5 pointer-events-none uppercase italic">
                            Roring
                        </div>
                        
                    </section>

                    <Footer />
                </div>
            </AppContent>
        </AppShell>
    );
}