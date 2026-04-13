import AdminLayout from '@/components/sidebar-admin';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Search, UserPlus, Filter, MoreHorizontal, 
    ArrowRight, Mail, Trophy, CreditCard
} from 'lucide-react';
import { useState } from 'react';

// Deklarasi global
declare global {
    interface Window {
        route: any;
    }
}

interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    program: string;
    status: string;
    date: string;
}

interface Props {
    members: Member[]; 
}

export default function MemberIndex({ members = [] }: Props) {
    const [search, setSearch] = useState('');

    const getRoute = (name: string, params?: any) => {
        if (typeof window !== 'undefined' && window.route) {
            try { return window.route(name, params); } catch (e) { console.error(e); }
        }
        const fallbacks: Record<string, string> = {
            'admin.member': '/admin/member',
            'admin.member-detail': `/admin/member-detail/${params}`,
            'admin.manage-member': '/admin/manage-member'
        };
        return fallbacks[name] || '#';
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(getRoute('admin.member'), { search }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout>
            <Head title="Athlete Database | Roring Admin" />

            <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4 md:p-6">
                
                {/* MODERN HEADER - Stacked on Mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                            Athlete Database
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[9px] rounded-full font-black uppercase tracking-wider shrink-0">
                                {members.length} Active
                            </span>
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm mt-1 font-medium">Manage Roring Academy athlete rosters.</p>
                    </div>

                    <Link 
                        href={getRoute('admin.manage-member')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
                    >
                        <UserPlus className="w-4 h-4" />
                        Registration
                    </Link>
                </div>

                {/* SEARCH & FILTER - Compact on Mobile */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <form onSubmit={handleSearch} className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Find athletes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-xl transition-all outline-none text-xs font-medium"
                        />
                    </form>
                    <button type="button" className="h-11 px-4 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2 font-bold text-xs text-slate-700 hover:bg-slate-50 transition-all active:scale-95">
                        <Filter className="w-4 h-4 text-slate-400" /> Filter
                    </button>
                </div>

                {/* TABLE CARD - Responsive Switch */}
                <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
                    {/* Desktop View (Table) */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-wider text-[10px]">Athlete Identity</th>
                                    <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-wider text-[10px]">Program</th>
                                    <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-wider text-[10px]">Status</th>
                                    <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-wider text-[10px] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 font-medium">
                                {members.map((member) => (
                                    <tr key={member.id} className="group hover:bg-blue-50/30 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                                                    {member.name?.substring(0, 1)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">{member.name}</p>
                                                    <p className="text-slate-400 text-[10px] uppercase truncate">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-slate-200/50">
                                                {member.program}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'approved' ? 'bg-green-500' : 'bg-slate-300'}`} />
                                                <span className={`font-black uppercase text-[10px] tracking-widest ${member.status === 'approved' ? 'text-green-600' : 'text-slate-400'}`}>
                                                    {member.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={getRoute('admin.member-detail', member.id)} className="inline-flex items-center gap-1.5 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform">
                                                View Profile <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View (Card List) */}
                    <div className="md:hidden divide-y divide-slate-100">
                        {members.length > 0 ? (
                            members.map((member) => (
                                <div key={member.id} className="p-5 flex items-center justify-between gap-4 active:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-100">
                                            {member.name?.substring(0, 1)}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-slate-900 text-sm truncate">{member.name}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] font-black text-blue-500 uppercase">{member.program}</span>
                                                <span className="text-slate-300">•</span>
                                                <span className={`text-[10px] font-black uppercase ${member.status === 'approved' ? 'text-green-500' : 'text-slate-400'}`}>
                                                    {member.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link 
                                        href={getRoute('admin.member-detail', member.id)}
                                        className="w-10 h-10 shrink-0 bg-slate-50 flex items-center justify-center rounded-xl text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center px-10">
                                <Trophy className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">No Athletes Data</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* COMPACT FOOTER */}
                <div className="px-2 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2 order-2 md:order-1">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                        Roring Academy // Database System
                    </div>
                    <div className="flex items-center gap-4 order-1 md:order-2">
                        <span>Serang // IDN</span>
                        <span className="text-slate-200">|</span>
                        <span>v2.0.4</span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
            `}} />
        </AdminLayout>
    );
}