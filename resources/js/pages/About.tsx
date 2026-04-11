import React from 'react';
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
    ChevronRight
} from 'lucide-react';

interface AboutProps {
    breadcrumbs: any;
}

export default function About({ breadcrumbs }: AboutProps) {
    return (
        <AppShell variant="header">
            <Head title="About Us | RoringBasketball" />
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header" className="p-0 overflow-x-hidden">
                <div className="bg-[#020617] text-white font-sans selection:bg-orange-500 selection:text-white">
                    
                    {/* SECTION 1: HERO - CINEMATIC IMPACT */}
                    <section className="relative h-screen flex items-center overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="/images/home/slide-3.jpg" 
                                className="w-full h-full object-cover scale-105 animate-slow-zoom" 
                                alt="Roring Basketball Hero" 
                            />
                            {/* Sophisticated Dual Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-l from-[#020617] via-[#020617]/60 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
                        </div>
                        
                        <div className="container mx-auto px-6 md:px-16 relative z-10 grid md:grid-cols-2">
                            <div className="hidden md:block"></div>
                            <div className="text-left md:text-right flex flex-col items-start md:items-end justify-center">
                                <div className="overflow-hidden mb-4">
                                    <img 
                                        src="/images/logo/roringlogo.png" 
                                        className="h-28 md:h-44 w-auto drop-shadow-[0_20px_50px_rgba(249,115,22,0.3)] animate-fade-in-up" 
                                        alt="Logo" 
                                    />
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] text-white mb-6">
                                    RORING<br />
                                    <span className="text-orange-500 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">BASKETBALL</span>
                                </h1>
                                <div className="h-2 w-32 bg-orange-500 mb-6 shadow-[0_0_20px_rgba(249,115,22,0.6)]"></div>
                                <p className="max-w-md text-gray-200 text-lg md:text-xl font-medium leading-relaxed italic opacity-90">
                                    "Build Character, Gain Skill, Create Legacy." Kami membentuk lebih dari sekadar pemain; kami membangun masa depan bola basket Indonesia.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: VISION & MISSION - FLOATING CARDS */}
                    <section className="py-32 bg-white text-slate-900 rounded-t-[4rem] -mt-20 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
                        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                            {[
                                { icon: <Target size={44} />, title: "The Vision", color: "text-orange-500", desc: "Menjadi pusat akademi basket paling berpengaruh yang menghasilkan atlet elit berstandar global." },
                                { icon: <Trophy size={44} />, title: "Our Mission", color: "text-blue-600", desc: "Menggabungkan disiplin tinggi dengan kreativitas basket modern untuk melatih fisik dan intelegensi pemain." },
                                { icon: <Users size={44} />, title: "Community", color: "text-slate-900", desc: "Menciptakan ekosistem dimana orang tua dan atlet tumbuh bersama dalam semangat sportivitas dan integritas." }
                            ].map((item, i) => (
                                <div key={i} className="group p-12 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
                                    <div className={`${item.color} mb-8 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-500`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-black uppercase italic mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed font-medium transition-colors">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 3: VIDEO SHOWCASE - IMMERSIVE */}
                    <section id="video-section" className="py-24 bg-slate-900 scroll-mt-20 overflow-hidden"> 
                        <div className="container mx-auto px-6">
                            <div className="relative aspect-video rounded-[4rem] overflow-hidden group ring-1 ring-white/10 shadow-3xl cursor-pointer">
                                <img 
                                    src="/images/video-thumb.jpg" 
                                    className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                                    alt="Video Thumbnail" 
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-20 group-hover:opacity-60 animate-pulse"></div>
                                        <button className="relative bg-orange-500 text-white w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                                            <PlayCircle size={60} fill="currentColor" />
                                        </button>
                                    </div>
                                    <span className="mt-8 text-white font-black uppercase tracking-[0.6em] text-[10px] opacity-40 group-hover:opacity-100 transition-opacity">Watch Experience</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: LIFE AT RORING - ASYMMETRIC BENTO */}
                    <section className="bg-white py-32">
                        <div className="container mx-auto px-6">
                            <div className="mb-20">
                                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                                    LIFE AT <br /><span className="text-blue-700">RORING ACADEMY</span>
                                </h2>
                                <div className="flex items-center gap-4 mt-6">
                                    <div className="h-1 w-20 bg-orange-500"></div>
                                    <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Intensity • Discipline • Family</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: 'BE ACTIVE', desc: 'Talenta muda yang dinamis siap menghadapi tantangan global.', img: '/images/activity/activity-1.jpg' },
                                    { title: 'INTENSIVE DRILL', desc: 'Latihan fundamental untuk akurasi dan kontrol bola maksimal.', img: '/images/activity/activity-1.jpg' },
                                    { title: 'TEAM WORK', desc: 'Membangun chemistry kuat di dalam dan luar lapangan.', img: '/images/activity/activity-1.jpg' },
                                    { title: 'GAME READY', desc: 'Kesiapan fisik dan mental untuk level turnamen tertinggi.', img: '/images/activity/activity-1.jpg' },
                                ].map((item, i) => (
                                    <div key={i} className="group relative aspect-[16/10] overflow-hidden rounded-[2.5rem] cursor-pointer">
                                        <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                                            <h4 className="text-4xl font-black uppercase italic text-white mb-2 translate-y-8 group-hover:translate-y-0 transition-all duration-500">{item.title}</h4>
                                            <p className="text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 5: AUTO SCROLL MOMENTS - PARALLAX EFFECT */}
                    <section className="py-32 bg-slate-50 overflow-hidden relative border-y border-slate-200">
                        <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
                            <div>
                                <span className="text-orange-500 font-black text-xs uppercase tracking-widest">Live Gallery</span>
                                <h2 className="text-4xl md:text-5xl font-black uppercase italic text-slate-900 tracking-tighter mt-2">ACADEMY MOMENTS</h2>
                            </div>
                            <div className="hidden md:block h-[1px] flex-1 mx-12 bg-slate-200"></div>
                        </div>

                        <div className="flex gap-8 animate-marquee whitespace-nowrap">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="group relative flex-shrink-0 w-[450px]">
                                    <div className="relative overflow-hidden rounded-[2rem] shadow-xl [transform:perspective(1000px)_rotateY(-10deg)] group-hover:rotate-0 transition-all duration-700">
                                        <img 
                                            src={`/images/scroll/scroll-${(i % 5) + 1}.jpg`} 
                                            className="h-80 w-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                            alt="Moment" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100">
                                            <div className="absolute bottom-8 left-8">
                                                <h4 className="text-white font-black uppercase italic text-xl">National League 2026</h4>
                                                <p className="text-orange-400 text-[10px] font-bold tracking-[0.2em] mt-1 uppercase">DBL Arena, Surabaya</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 6: THE ARCHITECTS - LUXURY ROSTER */}
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
                            {[
                                { name: 'Richard Roring', role: 'Head Coach', img: '/images/team/team-1.jpg', quote: 'Disiplin adalah fondasi dari setiap kemenangan besar yang bertahan lama.' },
                                { name: 'Alvin Susanto', role: 'Asst. Coach', img: '/images/team/team-1.jpg', quote: 'Fundamental yang kuat akan membawa anda melampaui batas kemampuan fisik.' },
                                { name: 'Denny Sumargo', role: 'Technical Advisor', img: '/images/team/team-1.jpg', quote: 'Bola basket bukan hanya permainan, tapi tentang mentalitas juara sejati.' },
                                { name: 'Maria Selena', role: 'Public Relation', img: '/images/team/team-1.jpg', quote: 'Membangun koneksi dan sportivitas dalam ekosistem basket nasional.' },
                            ].map((staff, idx) => (
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
                                        <p className="text-xl md:text-3xl text-gray-400 font-medium italic leading-tight max-w-lg">
                                            "{staff.quote}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </section>

                    {/* SECTION 7: CONTACT - BOLD FINALE */}
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
                                    <p>Town Square Mezzanine Level 2</p>
                                    <p>Jalan Hayam Wuruk No. 6, Surabaya, 60242</p>
                                    <p className="pt-4 text-4xl font-black text-orange-400 not-italic">(031) 5632606</p>
                                </div>
                                <button className="bg-blue-700 hover:bg-orange-500 text-white px-16 py-6 rounded-full font-black text-2xl uppercase italic transition-all shadow-3xl flex items-center gap-4 group">
                                    Start Your Journey
                                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 8: INFO BAR & MAP */}
                    <div className="bg-white py-12 border-b border-slate-100 relative z-20">
                        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-6">
                                <div className="bg-slate-100 p-4 rounded-2xl text-blue-700"><MapPin size={32} /></div>
                                <div>
                                    <span className="text-orange-500 font-black uppercase tracking-widest text-[10px]">Our Basecamp</span>
                                    <h4 className="text-slate-900 font-black text-xl italic uppercase">Surabaya, East Java - Indonesia</h4>
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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.691917637841!2d112.7346!3d-7.2756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTYnMzIuMiJTIDExMsKwNDQnMDQuNiJF!5e0!3m2!1sen!2sid!4v1614123456789!5m2!1sen!2sid" 
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                            className="w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-1000"
                        ></iframe>
                        {/* Overlay to block iframe scrolling unless focused */}
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"></div>
                    </section>

                    <Footer />
                </div>
            </AppContent>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee { 
                    0% { transform: translateX(0); } 
                    100% { transform: translateX(-50%); } 
                }
                .animate-marquee { 
                    display: flex; 
                    width: max-content; 
                    animation: marquee 40s linear infinite; 
                }
                .animate-marquee:hover { 
                    animation-play-state: paused; 
                }
                @keyframes slow-zoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s ease-in-out infinite alternate;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </AppShell>
    );
}