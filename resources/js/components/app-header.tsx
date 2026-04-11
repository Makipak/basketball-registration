import { Link } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Menu, X, UserCircle, ArrowRight } from 'lucide-react';

export function AppHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItem[] }) {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Schedule', href: '/schedule' },
        { name: 'Coach', href: '/coach' },
        { name: 'Program', href: '/program' },
        { name: 'About', href: '/about' },
        { name: 'FAQ', href: '/faq' },
    ];

    return (
        <>
            <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-white/80 backdrop-blur-md">
                <div className="flex h-16 items-center justify-between px-4 md:px-10 lg:px-16">
                    
                    {/* LOGO - More compact on mobile */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
                        <img src="/images/logo/roringlogo.png" alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
                        <div className="flex flex-col">
                            <span className="text-sm md:text-lg text-black font-black tracking-tighter leading-none uppercase italic">
                                Roring<span className="text-orange-500">basketball</span>
                            </span>
                            {/* Hidden on very small screens to save space */}
                            <span className="hidden xs:block text-[7px] text-gray-500 font-bold tracking-[0.4em] uppercase mt-0.5">Academy</span>
                        </div>
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className="text-[10px] font-bold text-black hover:text-orange-500 transition-colors uppercase tracking-[0.2em]">
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Desktop Only Login */}
                        <Link 
                            href="/login" 
                            className="hidden lg:flex items-center gap-2 px-3 py-2 text-[10px] font-black text-black uppercase tracking-widest hover:text-orange-500 transition-all"
                        >
                            <UserCircle size={16} />
                            Login
                        </Link>

                        {/* Join Button - Adjusted size for mobile */}
                        <Link 
                            href="/register" 
                            className="bg-orange-500 hover:bg-orange-600 px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-black text-[9px] md:text-[10px] text-white uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                        >
                            Join Member
                        </Link>

                        {/* HAMBURGER */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-black outline-none"
                        >
                            {isOpen ? <X size={24} className="text-orange-500" /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                <div className={`
                    absolute top-[64px] left-0 w-full overflow-y-auto transition-all duration-500 ease-in-out lg:hidden bg-[#020617]
                    ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 invisible'}
                `}>
                    <div className="absolute inset-0 bg-[#020617]/98 bg-[radial-gradient(circle_at_top_right,_#f9731615,_transparent_50%)] -z-10"></div>
                    
                    <nav className="relative flex flex-col p-6 gap-4">
                        {/* Primary Mobile Action: Login */}
                        <div className={`transition-all duration-500 delay-75 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                            <Link 
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-4 rounded-2xl bg-white/2 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:bg-white/10"
                            >
                                <UserCircle size={20} className="text-orange-500" />
                                Login to Account
                            </Link>
                        </div>

                        {/* Nav Links */}
                        <div className="flex flex-col gap-2 mt-4">
                            {navItems.map((item, idx) => (
                                <Link 
                                    key={item.name} 
                                    href={item.href} 
                                    onClick={() => setIsOpen(false)}
                                    className={`py-3 text-xl font-black text-white uppercase tracking-tighter hover:text-orange-500 transition-all flex items-center justify-between border-b border-white/5 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                                    style={{ transitionDelay: `${(idx + 2) * 50}ms` }}
                                >
                                    <span className="italic">{item.name}</span>
                                    <ArrowRight size={18} className="text-white/20 group-hover:text-orange-500" />
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Footer */}
                        <div className={`mt-8 pt-6 flex flex-col gap-4 transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex gap-6 justify-center">
                                {['Instagram', 'Youtube', 'Tiktok'].map((soc) => (
                                    <span key={soc} className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                                        {soc}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {isOpen && (
                <div 
                    className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}