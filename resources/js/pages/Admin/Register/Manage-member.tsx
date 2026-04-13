import AdminLayout from '@/components/sidebar-admin';
import { Head, router } from '@inertiajs/react';
import { 
    Search, Download, ArrowLeft, School 
} from 'lucide-react';
import { useState } from 'react';

// 1. Definisikan Interface
interface Registration {
    id: number;
    name: string;
    email: string;
    phone: string;
    program: string;
    age: number;
    school: string;
    status: string;
    created_at: string;
}

interface ManageMemberProps {
    registrations: Registration[];
}

export default function ManageMember({ registrations }: ManageMemberProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const goToDetail = (id: number) => {
        router.visit(`/admin/registration-detail/${id}`);
    };

    const handleAccept = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); 
        if(confirm('Terima pendaftar ini?')) {
            router.post(`/admin/registrations/${id}/accept`);
        }
    };

    const handleDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if(confirm('Apakah Anda yakin ingin menolak?')) {
            router.delete(`/admin/registrations/${id}`);
        }
    };

    const filteredData = registrations.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.school.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Manage Registrations | RoringBasketball" />
            
            <div className="space-y-8 p-4 md:p-6 lg:p-8">
                {/* HEADER SECTION */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <button 
                            onClick={() => window.history.back()} 
                            className="group flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all"
                        >
                            <ArrowLeft className="w-3 h-3 mr-1 group-hover:-translate-x-1 transition-transform" /> 
                            Back to Dashboard
                        </button>
                        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-950 leading-none">
                            Manage <span className="text-blue-600">Registrations.</span>
                        </h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                            {registrations.length} Pending Verifications
                        </p>
                    </div>

                    <button className="h-11 px-6 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:border-blue-600 transition-all shadow-sm text-slate-600">
                        <Download className="w-3.5 h-3.5" /> Export Queue
                    </button>
                </div>

                {/* SEARCH */}
                <div className="relative group max-w-2xl">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search by athlete name or school..."
                        className="w-full h-14 pl-14 pr-6 rounded-2xl border-2 border-white bg-white focus:border-blue-600 focus:outline-none font-bold text-sm shadow-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* TABLE SECTION */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Athlete Info</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Classification</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Verification Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredData.length > 0 ? filteredData.map((reg) => (
                                    <tr 
                                        key={reg.id} 
                                        onClick={() => goToDetail(reg.id)} 
                                        className="hover:bg-slate-50/80 transition-all cursor-pointer group"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-base shadow-lg group-hover:bg-blue-600 transition-colors">
                                                    {reg.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-950 uppercase text-xs tracking-tight">{reg.name}</p>
                                                    <span className="flex items-center text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
                                                        <School className="w-3 h-3 mr-1 text-blue-600" /> {reg.school}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black text-slate-900 uppercase italic tracking-tighter">
                                                    {reg.program}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {reg.age} Years Old
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            {/* BUTTONS: Terima & Tolak */}
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={(e) => handleAccept(e, reg.id)}
                                                    className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
                                                >
                                                    Terima
                                                </button>
                                                <button 
                                                    onClick={(e) => handleDelete(e, reg.id)}
                                                    className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-rose-100 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all"
                                                >
                                                    Tolak
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="p-20 text-center">
                                            <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[10px]">No pending registrations</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}