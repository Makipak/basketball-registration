import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { Footer } from '@/components/footer';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Zap, Target, Trophy } from 'lucide-react';

export default function Program({ breadcrumbs }: { breadcrumbs: any }) {
    const classPrograms = [
        { 
            title: 'Junior Elite', 
            age: 'U-12 to U-15', 
            img: '/images/kelas/junior.webp', 
            price: 'Rp 450rb',
            desc: 'Fokus pada pengembangan fundamental dasar dan koordinasi pemain muda.'
        },
        { 
            title: 'Pro Prospect', 
            age: 'U-16 to U-21', 
            img: '/images/kelas/pro.webp', 
            price: 'Rp 600rb',
            desc: 'Pelatihan intensif tingkat lanjut untuk persiapan kompetisi profesional.'
        },
        { 
            title: 'Private Camp', 
            age: 'All Ages', 
            img: '/images/kelas/privatecamp.webp', 
            price: 'Mulai 200rb',
            desc: 'Sesi latihan personal 1-on-1 dengan coach untuk detail teknik spesifik.'
        }
    ];

    const benefits = [
        {
            icon: <Target className="text-[#0056b3]" size={24} />,
            title: "Skill Development",
            desc: "Kurikulum terukur untuk mengasah fundamental hingga advance moves.",
            bgColor: "bg-blue-50"
        },
        {
            icon: <Zap className="text-orange-600" size={24} />,
            title: "High Intensity",
            desc: "Latihan dinamis untuk meningkatkan fisik dan mentalitas pemenang.",
            bgColor: "bg-orange-50"
        },
        {
            icon: <Trophy className="text-green-600" size={24} />,
            title: "Elite Competition",
            desc: "Kesempatan mengikuti turnamen resmi dan sparing antar academy.",
            bgColor: "bg-green-50"
        }
    ];

    return (
        <AppShell variant="header">
            <Head title="Our Programs | RoringBasketball" />
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
                                        Academy Programs
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                                    TRAINING <span className="text-orange-400">CLASSES</span>
                                </h1>

                                <div className="mt-4 max-w-lg">
                                    <p className="text-blue-100 text-xs md:text-sm leading-relaxed font-medium uppercase tracking-wider italic opacity-80">
                                        Pilih jenjang pelatihan yang sesuai dengan kategori umur dan 
                                        target performa yang ingin dicapai di lapangan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. PROGRAM LIST */}
                    <section className="py-32 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
                                {classPrograms.map((prog, idx) => (
                                    <div key={idx} className="group flex flex-col">
                                        {/* Image Box */}
                                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-8 rounded-sm shadow-xl">
                                            <img 
                                                src={prog.img} 
                                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                                                alt={prog.title} 
                                            />
                                            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-all duration-500"></div>
                                            <div className="absolute bottom-6 left-6">
                                                <span className="bg-orange-500 text-white font-black italic uppercase text-[10px] px-4 py-2 tracking-widest shadow-2xl">
                                                    {prog.age}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-2">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="h-[1px] w-8 bg-orange-500"></div>
                                                <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[9px]">Kategori Program</span>
                                            </div>
                                            <h3 className="text-3xl font-black uppercase italic text-slate-900 leading-none mb-4 group-hover:text-[#0056b3] transition-colors">
                                                {prog.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium italic">
                                                "{prog.desc}"
                                            </p>
                                            
                                            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mulai Dari</span>
                                                    <span className="text-slate-900 font-black text-2xl tracking-tighter">{prog.price}</span>
                                                </div>
                                                <Link href="/program/member">
                                                    <div className="bg-slate-900 text-white p-4 rounded-full hover:bg-orange-500 hover:-rotate-12 transition-all duration-300 shadow-lg">
                                                        <ArrowRight size={20} />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 3. WHY JOIN US SECTION */}
                    <section className="py-24 bg-slate-50 border-y border-slate-100">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {benefits.map((item, i) => (
                                    <div key={i} className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                        <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center`}>
                                            {item.icon}
                                        </div>
                                        <h4 className="text-xl font-black uppercase italic text-slate-900">{item.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </section>

                    <Footer />
                </div>
            </AppContent>
        </AppShell>
    );
}