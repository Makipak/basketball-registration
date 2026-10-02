import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { Footer } from '@/components/footer';
import { Head } from '@inertiajs/react';
import { Instagram, Twitter, Trophy, Zap } from 'lucide-react';

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
            name: 'Randy Putrama',
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
                    <section className="bg-[#0056b3] relative pt-10 pb-12 sm:pt-12 sm:pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 border-b border-white/5">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="h-[1px] w-6 sm:w-8 bg-orange-500"></div>
                                    <span className="text-orange-500 font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[8px] sm:text-[9px] md:text-[10px]">
                                        Technical Staff
                                    </span>
                                </div>

                                <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.95] text-white break-words">
                                    THE <span className="text-orange-400">ARCHITECTS</span>
                                </h1>

                                <div className="mt-3 sm:mt-4 max-w-xs min-[400px]:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                                    <p className="text-blue-100 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed font-medium uppercase tracking-wider italic opacity-80">
                                        Sistem kepelatihan terintegrasi untuk membangun fundamental
                                        dan intelegensi pemain di level tertinggi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. COACHES LIST */}
                    <section className="py-12 sm:py-16 md:py-24 lg:py-28 xl:py-32 bg-white">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-y-14 md:gap-y-16 lg:gap-y-20 xl:gap-y-24 gap-x-6 md:gap-x-8 lg:gap-x-10 xl:gap-x-12">
                                {coaches.map((coach, idx) => (
                                    <div
                                        key={idx}
                                        className="group flex flex-col w-full max-w-sm sm:max-w-none mx-auto"
                                    >
                                        {/* Image Box */}
                                        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 mb-5 sm:mb-6 lg:mb-8 rounded-sm shadow-lg lg:shadow-xl">
                                            <img
                                                src={coach.img}
                                                loading="lazy"
                                                className="w-full h-full object-cover object-top transition-all duration-700 lg:group-hover:scale-110"
                                                alt={coach.name}
                                            />
                                            {/* Overlay subtle */}
                                            <div className="absolute inset-0 bg-blue-900/10 lg:group-hover:bg-transparent transition-all duration-500"></div>

                                            {/* Experience Badge */}
                                            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6">
                                                <span className="inline-block bg-orange-500 text-white font-black italic uppercase text-[9px] sm:text-[10px] px-3 py-1.5 sm:px-4 sm:py-2 tracking-widest shadow-2xl">
                                                    EXP: {coach.experience}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="px-1 sm:px-2 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                                <div className="h-[1px] w-6 sm:w-8 bg-orange-500"></div>
                                                <span className="text-orange-600 font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[8px] sm:text-[9px]">
                                                    {coach.role}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl sm:text-[26px] md:text-3xl font-black uppercase italic text-slate-900 leading-none mb-3 sm:mb-4 lg:group-hover:text-[#0056b3] transition-colors break-words">
                                                {coach.name}
                                            </h3>

                                            <p className="text-slate-500 text-[13px] sm:text-sm leading-relaxed mb-5 sm:mb-6 lg:mb-8 font-medium italic sm:min-h-[4rem] lg:min-h-[3.5rem]">
                                                "{coach.bio}"
                                            </p>

                                            <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-4 sm:pt-5 lg:pt-6 border-t border-slate-100">
                                                <div className="flex items-center gap-2 text-slate-900">
                                                    <Zap size={14} className="text-orange-500 animate-pulse shrink-0" />
                                                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                                                        {coach.specialization}
                                                    </span>
                                                </div>
                                                <div className="flex gap-1 sm:gap-2">
                                                    <a
                                                        href="#"
                                                        aria-label={`Instagram ${coach.name}`}
                                                        className="flex items-center justify-center w-10 h-10 transition-transform active:scale-95 lg:hover:scale-125"
                                                    >
                                                        <Instagram size={18} className="text-slate-400 hover:text-orange-500 transition-colors" />
                                                    </a>
                                                    <a
                                                        href="#"
                                                        aria-label={`Twitter ${coach.name}`}
                                                        className="flex items-center justify-center w-10 h-10 transition-transform active:scale-95 lg:hover:scale-125"
                                                    >
                                                        <Twitter size={18} className="text-slate-400 hover:text-blue-500 transition-colors" />
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
                    <section className="py-14 sm:py-16 md:py-20 lg:py-24 bg-slate-900 text-white overflow-hidden relative">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
                            <Trophy className="text-orange-500 mb-4 sm:mb-6 w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12" />
                            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 sm:mb-6 leading-tight">
                                More Than Just <span className="text-orange-500">Basketball</span>
                            </h2>
                            <p className="text-slate-400 max-w-xs min-[400px]:max-w-md sm:max-w-xl md:max-w-2xl text-[13px] sm:text-sm md:text-base leading-relaxed font-medium">
                                Kami percaya bahwa lapangan basket adalah tempat terbaik untuk belajar tentang kerja keras,
                                kerja sama tim, dan ketangguhan mental yang akan berguna sepanjang hidup.
                            </p>
                        </div>
                        {/* Background Text Accent */}
                        <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 md:-bottom-10 md:-right-10 text-6xl sm:text-8xl md:text-9xl font-black text-white/5 pointer-events-none uppercase italic select-none">
                            Roring
                        </div>
                    </section>

                    <Footer />
                </div>
            </AppContent>
        </AppShell>
    );
}