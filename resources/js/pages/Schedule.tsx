import React, { useState } from 'react';
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { Footer } from '@/components/footer'; // Pastikan footer dipanggil
import type { AppLayoutProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Calendar, 
    Clock, 
    MapPin, 
    ChevronRight, 
    Filter,
    Users,
    Info,
    Trophy,
    Search
} from 'lucide-react';

export default function Schedule({ breadcrumbs }: AppLayoutProps) {
    const [activeDay, setActiveDay] = useState('Senin');
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

    const sessions = [
        { 
            time: '15:00', 
            duration: '120 min',
            title: 'Junior Elite (U-12)', 
            coach: 'Coach Hendra', 
            court: 'Court A (Indoor)', 
            category: 'Junior',
            status: 'Tersedia',
            intensity: 'Medium'
        },
        { 
            time: '17:00', 
            duration: '120 min',
            title: 'Pro Prospect (U-18)', 
            coach: 'Coach Wijaya', 
            court: 'Main Court', 
            category: 'Pro',
            status: 'Penuh',
            intensity: 'High'
        },
        { 
            time: '19:00', 
            duration: '90 min',
            title: 'Private Shooting Clinic', 
            coach: 'Coach Sarah', 
            court: 'Court B', 
            category: 'Private',
            status: 'Tersedia',
            intensity: 'High'
        },
    ];

    return (
        <AppShell variant="header">
            <Head title="Jadwal Latihan | RoringBasketball" />
            
            <AppHeader breadcrumbs={breadcrumbs} />

            <AppContent variant="header" className="p-0">
                <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-orange-500/30">
                    
                    {/* 1. HERO HEADER */}
                    <section className="bg-white pt-10 pb-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-12 translate-x-20 z-0 hidden lg:block"></div>
                        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="h-[2px] w-8 bg-orange-500"></span>
                                    <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Training Timetable</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none mb-6">
                                    MASTER YOUR <br />
                                    <span className="text-[#0056b3]">SCHEDULE</span>
                                </h1>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                                    Disiplin adalah kunci. Pilih sesi latihan Anda dan bangun konsistensi untuk mencapai level elit.
                                </p>
                                
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-3 bg-slate-100/50 border border-slate-200 p-2 pl-4 rounded-2xl w-full md:w-auto">
                                        <Search size={18} className="text-slate-400" />
                                        <input type="text" placeholder="Cari kelas atau pelatih..." className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full md:w-64" />
                                    </div>
                                    <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all flex items-center gap-2">
                                        <Filter size={18} /> Filter Sesi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. DAY SELECTOR (Sticky) */}
                    <section className="sticky top-[64px] z-40 bg-white/90 backdrop-blur-xl border-y border-slate-100 shadow-sm">
                        <div className="container mx-auto px-6 md:px-12 lg:px-24">
                            <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2">
                                <div className="flex space-x-1">
                                    {days.map((day) => (
                                        <button
                                            key={day}
                                            onClick={() => setActiveDay(day)}
                                            className={`px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${
                                                activeDay === day 
                                                ? 'bg-[#0056b3] text-white shadow-lg shadow-blue-600/30 -translate-y-1' 
                                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. SCHEDULE GRID */}
                    <section className="py-16 px-6 md:px-12 lg:px-24">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
                                {sessions.map((session, index) => (
                                    <div 
                                        key={index} 
                                        className="group bg-white rounded-[2.5rem] border border-slate-100 p-2 pr-6 md:pr-10 flex flex-col md:flex-row items-center gap-6 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500"
                                    >
                                        {/* Time Box */}
                                        <div className="w-full md:w-48 bg-slate-50 rounded-[2rem] p-8 flex flex-col items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                                            <span className="text-3xl font-black text-slate-900 group-hover:text-white transition-colors">
                                                {session.time}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-200 uppercase tracking-[0.2em] mt-1">
                                                {session.duration}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 px-4 md:px-0 text-center md:text-left">
                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                                                    session.category === 'Pro' 
                                                    ? 'bg-orange-50 border-orange-100 text-orange-600' 
                                                    : 'bg-blue-50 border-blue-100 text-blue-600'
                                                }`}>
                                                    {session.category} Category
                                                </span>
                                                <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                                    <Trophy size={10} /> Intensity: {session.intensity}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                                                {session.title}
                                            </h3>

                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                                                        <Users size={14} className="text-slate-600" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-600">{session.coach}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                                                        <MapPin size={14} className="text-slate-600" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-600">{session.court}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="w-full md:w-auto pb-6 md:pb-0">
                                            <div className="flex flex-col items-center md:items-end gap-3">
                                                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-1 ${
                                                    session.status === 'Tersedia' ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                                                        session.status === 'Tersedia' ? 'bg-green-500' : 'bg-red-500'
                                                    }`}></span>
                                                    {session.status}
                                                </div>
                                                <button 
                                                    disabled={session.status === 'Penuh'}
                                                    className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
                                                        session.status === 'Tersedia' 
                                                        ? 'bg-slate-900 text-white hover:bg-blue-600 hover:-translate-x-2' 
                                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                    }`}
                                                >
                                                    Booking Sesi <ChevronRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* 4. NOTE SECTION */}
                    <section className="pb-32 px-6">
                        <div className="max-w-4xl mx-auto">
                            {/* Ganti HoopsLegacy jadi Roring Basketball di poin 02 */}
                            <div className="bg-slate-900 border-2 border-dashed border-slate-700 rounded-[3rem] p-10 md:p-16 text-center">
                                <div className="inline-flex bg-[#0056b3] text-white p-4 rounded-2xl mb-8">
                                    <Info size={32} />
                                </div>
                                {/* Fix typo class font-white jadi text-white */}
                                <h4 className="text-2xl font-black uppercase italic tracking-tight mb-4 text-white">
                                    Ketentuan Latihan
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-10">
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="text-orange-500 font-black">01.</div>
                                            <p className="text-slate-300 text-sm font-medium">Hadir di lokasi minimal 20 menit sebelum sesi dimulai untuk pemanasan mandiri.</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="text-orange-500 font-black">02.</div>
                                            <p className="text-slate-300 text-sm font-medium">Wajib mengenakan jersey official Roring Basketball selama sesi berlangsung.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="text-orange-500 font-black">03.</div>
                                            <p className="text-slate-300 text-sm font-medium">Membawa perlengkapan pribadi (sepatu basket, handuk, dan air minum).</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="text-orange-500 font-black">04.</div>
                                            <p className="text-slate-300 text-sm font-medium">Pembatalan jadwal hanya dapat dilakukan melalui dashboard maksimal H-1.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </section>
                    <Footer />
                </div>
            </AppContent>
        </AppShell>
    );
}