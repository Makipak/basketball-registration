import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, Users, Trophy, 
    Calendar, LogOut, ChevronRight, 
    CreditCard, UserCircle, Menu, X,
    ShieldCheck // Icon tanda Admin
} from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const { url, props } = usePage();
    const { auth } = props as any;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Manage Member', href: '/admin/manage-member', icon: Users },
        { name: 'Members', href: '/admin/member', icon: Users },
        { name: 'Programs', href: '/admin/programs', icon: Trophy },
        { name: 'Schedule', href: '/admin/schedule', icon: Calendar },
        { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-x-hidden">
            
            {/* CSS INJECT - Menghilangkan Scrollbar */}
            <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
            
            {/* MOBILE HEADER */}
            <header className="md:hidden bg-slate-950 text-white p-4 flex items-center justify-between sticky top-0 z-[60] border-b border-slate-800 shadow-xl">
                <div className="flex items-center gap-3">
                    <img src="/images/logo/roringlogo.png" className="h-6 w-auto grayscale brightness-200" alt="Logo" />
                    <span className="text-sm font-black tracking-tighter uppercase italic">RORING<span className="text-blue-600">.</span>HQ</span>
                </div>
                
                {/* Bagian Hamburger + Tanda Admin */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-blue-600/10 border border-blue-500/20 py-1 px-2.5 rounded-lg">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-[10px] font-black uppercase tracking-tighter text-green-500">Admin</span>
                    </div>
                    <button 
                        onClick={toggleSidebar} 
                        className="p-2.5 bg-slate-900 rounded-xl text-white active:scale-95 transition-transform border border-slate-800"
                    >
                        {isSidebarOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6 text-white" />}
                    </button>
                </div>
            </header>

            {/* OVERLAY */}
            <div 
                className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[70] transition-opacity duration-300 md:hidden ${
                    isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* SIDEBAR */}
            <aside className={`
                fixed inset-y-0 left-0 w-64 bg-slate-950 border-r border-slate-900 flex flex-col z-[80]
                transition-transform duration-300 ease-in-out transform
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                md:sticky md:top-0 md:h-screen
            `}>
                
                {/* BRANDING */}
                <div className="p-6 md:p-8 border-b border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo/roringlogo.png" className="h-7 w-auto grayscale brightness-200" alt="Logo" />
                        <span className="text-xl font-black tracking-tighter uppercase text-white italic leading-none">
                            RORING<span className="text-blue-600">.</span>HQ
                        </span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* NAV LINKS - Scrollbar Tersembunyi */}
                <nav className="flex-1 overflow-y-auto p-4 md:p-6 space-y-1.5 no-scrollbar">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-3">Main Menu</p>
                    
                    {navigation.map((item) => {
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    group flex items-center justify-between p-3.5 rounded-xl transition-all duration-200
                                    ${isActive 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-500'}`} />
                                    <span className="text-[11px] font-black uppercase tracking-widest">{item.name}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* USER PROFILE & LOGOUT */}
                <div className="p-6 bg-slate-900/40 border-t border-slate-900">
                    <div className="flex items-center gap-3 mb-5 px-1">
                        <div className="relative group">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                                <UserCircle className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 bg-green-500 border-2 border-slate-950 rounded-full p-0.5">
                                <ShieldCheck className="w-2.5 h-2.5 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-black text-white uppercase truncate">
                                {auth?.user?.name || 'Ahmad Sanusi'}
                            </p>
                            <p className="text-[8px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                                {auth?.user?.role || 'Administrator'}
                            </p>
                        </div>
                    </div>

                    <Link 
                        method="post" 
                        as="button" 
                        href="/logout" 
                        className="w-full flex items-center justify-center gap-2.5 p-3.5 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white transition-all rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border border-red-500/20 hover:border-red-600 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Sign Out
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 min-w-0 relative bg-slate-50 min-h-screen">
                <div className="p-5 md:p-10 max-w-[1440px] mx-auto animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}