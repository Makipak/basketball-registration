import React from 'react';
import { Head, Link } from '@inertiajs/react'; // Pastikan Link diimport di sini
import AdminLayout from '@/components/sidebar-admin'; 
import { 
    Users, 
    Calendar, 
    DollarSign,
    MoreVertical,
    CheckCircle2,
    Clock,
     BarChart3,
    Plus
} from 'lucide-react';

interface Props {
    breadcrumbs: { label: string; href: string }[];
}

export default function AdminDashboard({ breadcrumbs }: Props) {
    const stats = [
        { label: 'Total Members', value: '124', icon: Users, color: 'bg-blue-600', trend: '+12% bln ini' },
        { label: 'Sesi Aktif', value: '12', icon: Calendar, color: 'bg-orange-500', trend: 'Minggu ini' },
        { label: 'Booking Baru', value: '45', icon: CheckCircle2, color: 'bg-green-500', trend: '24 jam terakhir' },
        { label: 'Pendapatan', value: 'Rp 12.5M', icon: DollarSign, color: 'bg-slate-900', trend: '+8% bln ini' },
    ];

    const recentBookings = [
        { id: '1', user: 'Andi Pratama', class: 'Junior Elite (U-12)', date: '14 Apr, 15:00', status: 'Lunas' },
        { id: '2', user: 'Budi Santoso', class: 'Pro Prospect (U-18)', date: '14 Apr, 17:00', status: 'Pending' },
        { id: '3', user: 'Citra Kirana', class: 'Private Clinic', date: '15 Apr, 10:00', status: 'Lunas' },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard | RoringBasketball" />

            <div className="flex flex-col gap-8 p-8 italic font-medium">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 leading-none">
                            Admin <span className="text-[#0056b3]">Dashboard</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-bold mt-2 uppercase tracking-widest">
                            Overview aktivitas Roring Basketball
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            href="/admin/analytics" 
                            className="bg-[#0056b3] hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-black text-xs transition-all text-center uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <BarChart3 size={16} className="mb-0.5" /> {/* Sedikit offset biar sejajar dengan font black */}
                            Lihat Diagram
                        </Link>
                    </div>
                
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-2xl text-white`}>
                                    <stat.icon size={20} />
                                </div>
                                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</h3>
                            <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Table Section */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="font-black uppercase italic tracking-tight text-slate-900">Booking Terbaru</h3>
                            <button className="text-xs font-bold text-[#0056b3] hover:underline uppercase">Lihat Semua</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <tr>
                                        <th className="px-8 py-4">Member</th>
                                        <th className="px-8 py-4">Kelas</th>
                                        <th className="px-8 py-4 text-center">Status</th>
                                        <th className="px-8 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <span className="text-sm font-bold text-slate-900">{booking.user}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-xs font-medium text-slate-600 uppercase">{booking.class}</span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                                                    booking.status === 'Lunas' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="text-slate-400 hover:text-slate-900 p-1">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black uppercase italic mb-2">Peringatan</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-bold uppercase">
                                    Ada 3 sesi latihan besok yang belum memiliki pelatih.
                                </p>
                                <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                                    Tugaskan Sekarang
                                </button>
                            </div>
                            <Clock size={120} className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                            <h3 className="font-black uppercase italic tracking-tight text-slate-900 mb-6">Log Aktivitas</h3>
                            <div className="space-y-6">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex gap-4 border-b border-slate-50 pb-4 last:border-0">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                        <div>
                                            <p className="text-xs text-slate-600 leading-snug">
                                                <span className="font-bold text-slate-900 italic">System:</span> New registration from <span className="font-bold">Ucup</span>.
                                            </p>
                                            <span className="text-[10px] text-slate-400 uppercase font-bold italic">2 jam yang lalu</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}