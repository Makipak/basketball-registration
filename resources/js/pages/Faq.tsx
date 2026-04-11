import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { Footer } from '@/components/footer';
import { Head } from '@inertiajs/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQProps {
    breadcrumbs: any;
}

export default function FAQ({ breadcrumbs }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Kapan jadwal latihan rutin diadakan?",
            answer: "Jadwal latihan rutin kami diadakan setiap hari Senin hingga Minggu, mulai pukul 08:00 pagi hingga 09:00 malam, tergantung pada kelompok umur dan level kelas yang diambil."
        },
        {
            question: "Apakah ada batasan usia untuk mendaftar?",
            answer: "Kami membuka kelas untuk berbagai tingkatan, mulai dari kategori Junior (usia sekolah dasar) hingga level profesional. Setiap kategori memiliki kurikulum yang disesuaikan dengan perkembangan fisik atlet."
        },
        {
            question: "Bagaimana cara pendaftaran member baru?",
            answer: "Pendaftaran bisa dilakukan secara langsung melalui platform digital ini pada menu 'Apply for Academy'. Anda perlu mengisi data diri dan memilih jadwal trial terlebih dahulu."
        },
        {
            question: "Di mana lokasi basecamp utama Roring Basketball?",
            answer: "Basecamp utama kami berlokasi di Surabaya, Jawa Timur - Indonesia. Detail alamat lengkap dan titik maps dapat Anda lihat pada bagian bawah halaman kontak."
        },
        {
            question: "Apakah disediakan trial gratis bagi calon member?",
            answer: "Ya, kami menyediakan sesi trial satu kali untuk calon member baru agar bisa merasakan atmosfer latihan dan berkonsultasi langsung dengan tim Technical Staff kami."
        }
    ];

    return (
        <AppShell variant="header">
            <Head title="FAQ | RoringBasketball" />
            <AppHeader breadcrumbs={breadcrumbs} />
            
            <AppContent variant="header" className="p-0 overflow-x-hidden">
                <div className="bg-white font-sans min-h-screen selection:bg-orange-500">
                    
                    {/* 1. HERO FAQ - KONSISTEN DENGAN THEME BIRU */}
                    <section className="pt-16 pb-20 bg-[#0056b3] border-b border-white/10">
                        <div className="container mx-auto px-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-[1px] w-8 bg-orange-500"></div>
                                <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[9px]">
                                    Support Center
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
                                HELP & <span className="text-orange-400">FAQ</span>
                            </h1>
                            <p className="text-blue-100 text-sm max-w-lg italic font-medium opacity-80 uppercase tracking-wide leading-relaxed">
                                Temukan jawaban mengenai prosedur pendaftaran, jadwal latihan, 
                                dan informasi teknis akademi secara cepat.
                            </p>
                        </div>
                    </section>

                    {/* 2. FAQ LIST SECTION */}
                    <section className="py-24 bg-white">
                        <div className="container mx-auto px-6 max-w-3xl">
                            <div className="space-y-4">
                                {faqs.map((faq, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`border transition-all duration-300 rounded-2xl ${
                                            openIndex === idx 
                                            ? 'border-orange-500/30 bg-orange-50/10 shadow-sm' 
                                            : 'border-slate-100 bg-white hover:border-slate-200'
                                        }`}
                                    >
                                        <button 
                                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-6 text-left transition-colors"
                                        >
                                            <span className={`font-black text-sm md:text-base uppercase italic tracking-tight transition-colors ${
                                                openIndex === idx ? 'text-orange-600' : 'text-slate-900'
                                            }`}>
                                                {faq.question}
                                            </span>
                                            <div className={`p-1.5 rounded-full transition-all duration-300 ${
                                                openIndex === idx ? 'bg-orange-500 text-white rotate-180' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                                {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                                            </div>
                                        </button>
                                        
                                        <div 
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                                openIndex === idx ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed font-medium italic border-t border-slate-50/50">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 3. CONTACT CALLOUT - CUSTOMER SUPPORT */}
                            <div className="mt-20 p-10 bg-slate-900 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-2xl">
                                {/* Decorative Background Element */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
                                
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="bg-[#0056b3] p-4 rounded-2xl text-white rotate-3 shadow-lg group-hover:rotate-0 transition-transform">
                                        <HelpCircle size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-lg uppercase italic leading-none">Punya pertanyaan lain?</h4>
                                        <p className="text-slate-400 text-xs mt-2 italic font-medium">Tim kami siap membantu Anda via WhatsApp Support.</p>
                                    </div>
                                </div>
                                <button className="bg-orange-500 text-white px-10 py-4 rounded-full font-black uppercase italic text-xs tracking-widest hover:bg-white hover:text-orange-600 transition-all shadow-xl active:scale-95 relative z-10">
                                    Chat Support
                                </button>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            </AppContent>
        </AppShell>
    );
}