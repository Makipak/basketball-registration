import React, { useState, useEffect, useRef } from 'react';
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { Footer } from '@/components/footer';
import type { AppLayoutProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    Clock,
    MapPin,
    ChevronRight,
    Users,
    Info,
    Trophy
} from 'lucide-react';

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

const rules = [
    'Hadir di lokasi minimal 20 menit sebelum sesi dimulai untuk pemanasan mandiri.',
    'Wajib mengenakan jersey official Roring Basketball selama sesi berlangsung.',
    'Membawa perlengkapan pribadi (sepatu basket, handuk, dan air minum).',
    'Pembatalan jadwal hanya dapat dilakukan melalui dashboard maksimal H-1.',
];

export default function Schedule({ breadcrumbs }: AppLayoutProps) {
    const [activeDay, setActiveDay] = useState('Senin');
    const dayBarRef = useRef<HTMLDivElement>(null);

    // Di layar kecil, hari yang dipilih otomatis digeser ke tengah bar
    useEffect(() => {
        const bar = dayBarRef.current;
        const btn = bar?.querySelector<HTMLElement>(`[data-day="${activeDay}"]`);
        if (bar && btn && bar.scrollWidth > bar.clientWidth) {
            bar.scrollTo({
                left: btn.offsetLeft - (bar.clientWidth - btn.offsetWidth) / 2,
                behavior: 'smooth',
            });
        }
    }, [activeDay]);

    return (
        <AppShell variant="header">
            <Head title="Jadwal Latihan | RoringBasketball" />

            <AppHeader breadcrumbs={breadcrumbs} />

            <AppContent variant="header" className="p-0">
                <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] font-sans text-slate-900 selection:bg-orange-500/30">

                    {/* 1. HERO HEADER */}
                    <section className="relative overflow-hidden bg-white pb-12 pt-8 sm:pb-16 md:pb-20 md:pt-10">
                        <div className="absolute right-0 top-0 z-0 hidden h-full w-1/3 translate-x-20 skew-x-12 bg-blue-50/50 lg:block"></div>
                        <div className="container relative z-10 mx-auto px-5 sm:px-8 md:px-12 lg:px-24">
                            <div className="max-w-3xl">
                                <div className="mb-3 flex items-center gap-2 md:mb-4">
                                    <span className="h-[2px] w-6 bg-orange-500 md:w-8"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 md:tracking-[0.3em]">Training Timetable</span>
                                </div>
                                <h1 className="mb-4 text-4xl font-black uppercase italic leading-none tracking-tighter sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
                                    MASTER YOUR <br />
                                    <span className="text-[#0056b3]">SCHEDULE</span>
                                </h1>
                                <p className="max-w-xl text-base font-medium leading-relaxed text-slate-500 md:text-lg">
                                    Disiplin adalah kunci. Pilih sesi latihan Anda dan bangun konsistensi untuk mencapai level elit.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 2. DAY SELECTOR (Sticky) */}
                    <section className="sticky top-[64px] z-40 border-y border-slate-100 bg-white/90 shadow-sm backdrop-blur-xl">
                        <div className="container mx-auto px-3 sm:px-8 md:px-12 lg:px-24">
                            <div ref={dayBarRef} className="no-scrollbar flex items-center overflow-x-auto py-2 md:justify-between lg:justify-start">
                                <div className="flex space-x-1">
                                    {days.map((day) => (
                                        <button
                                            key={day}
                                            data-day={day}
                                            onClick={() => setActiveDay(day)}
                                            aria-pressed={activeDay === day}
                                            className={`shrink-0 rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-wider transition-all sm:px-5 sm:py-3.5 md:px-6 md:py-4 md:text-xs md:tracking-widest ${
                                                activeDay === day
                                                ? 'bg-[#0056b3] text-white shadow-lg shadow-blue-600/30 md:-translate-y-1'
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
                    <section className="px-4 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-24">
                        <div className="container mx-auto">
                            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:gap-6">
                                {sessions.map((session, index) => (
                                    <div
                                        key={index}
                                        className="group flex flex-col items-stretch gap-4 rounded-[1.75rem] border border-slate-100 bg-white p-2 transition-all duration-500 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] md:rounded-[2.5rem] lg:flex-row lg:items-center lg:gap-6 lg:pr-8"
                                    >
                                        {/* Time Box */}
                                        <div className="flex w-full flex-row items-center justify-between rounded-[1.25rem] border border-slate-100 bg-slate-50 px-6 py-4 transition-all duration-500 group-hover:border-blue-600 group-hover:bg-blue-600 sm:px-8 md:rounded-[2rem] lg:w-44 lg:flex-col lg:justify-center lg:px-6 lg:py-8 xl:w-48">
                                            <span className="text-2xl font-black text-slate-900 transition-colors group-hover:text-white sm:text-3xl">
                                                {session.time}
                                            </span>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-blue-200 lg:mt-1">
                                                {session.duration}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="min-w-0 flex-1 px-3 text-left sm:px-4 lg:px-0">
                                            <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                                                <span className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                                                    session.category === 'Pro'
                                                    ? 'border-orange-100 bg-orange-50 text-orange-600'
                                                    : 'border-blue-100 bg-blue-50 text-blue-600'
                                                }`}>
                                                    {session.category} Category
                                                </span>
                                                <span className="flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                                    <Trophy size={10} /> Intensity: {session.intensity}
                                                </span>
                                            </div>

                                            <h3 className="mb-3 text-xl font-black uppercase italic tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 sm:text-2xl md:mb-4 lg:text-3xl">
                                                {session.title}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:gap-x-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100">
                                                        <Users size={14} className="text-slate-600" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-600">{session.coach}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100">
                                                        <MapPin size={14} className="text-slate-600" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-600">{session.court}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="w-full px-3 pb-3 sm:px-4 sm:pb-4 lg:w-auto lg:p-0">
                                            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end lg:justify-start">
                                                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest lg:mb-1 ${
                                                    session.status === 'Tersedia' ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                    <span className={`h-2 w-2 animate-pulse rounded-full ${
                                                        session.status === 'Tersedia' ? 'bg-green-500' : 'bg-red-500'
                                                    }`}></span>
                                                    {session.status}
                                                </div>
                                                <button
                                                    disabled={session.status === 'Penuh'}
                                                    className={`flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all sm:px-8 ${
                                                        session.status === 'Tersedia'
                                                        ? 'bg-slate-900 text-white hover:bg-blue-600 lg:hover:-translate-x-2'
                                                        : 'cursor-not-allowed bg-slate-100 text-slate-400'
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
                    <section className="px-4 pb-16 sm:px-6 md:pb-32">
                        <div className="mx-auto max-w-4xl">
                            <div className="rounded-[2rem] border-2 border-dashed border-slate-700 bg-slate-900 p-6 text-center sm:p-10 md:rounded-[3rem] md:p-16">
                                <div className="mb-5 inline-flex rounded-2xl bg-[#0056b3] p-3 text-white md:mb-8 md:p-4">
                                    <div className="flex items-center justify-center"><Info className="h-6 w-6 md:h-8 md:w-8" /></div>
                                </div>
                                <h4 className="mb-4 text-xl font-black uppercase italic tracking-tight text-white md:text-2xl">
                                    Ketentuan Latihan
                                </h4>
                                <ol className="mt-6 grid grid-cols-1 gap-5 text-left md:mt-10 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
                                    {rules.map((rule, i) => (
                                        <li key={i} className="flex gap-3 md:gap-4">
                                            <span className="shrink-0 font-black text-orange-500">{String(i + 1).padStart(2, '0')}.</span>
                                            <p className="text-sm font-medium text-slate-300">{rule}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
            </AppContent>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </AppShell>
    );
}