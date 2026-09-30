import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/components/sidebar-admin'; 
import { TrendingUp, Users, Wallet, Database, Zap, ArrowLeft } from 'lucide-react'; // Tambahkan ArrowLeft
import { 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    Area, Line, ComposedChart, Bar, Cell 
} from 'recharts';

interface AnalyticsData {
    month: string;
    revenue?: number;
    members?: number;
}

interface Props {
    auth: any;
    breadcrumbs: any;
    revenueData: AnalyticsData[];
    memberData: AnalyticsData[];
}

export default function ChartPage({ auth, breadcrumbs, revenueData = [], memberData = [] }: Props) {
    const [activeTab, setActiveTab] = useState<'revenue' | 'members'>('revenue');

    const totalRevenue = (revenueData || []).reduce((acc, curr) => acc + (Number(curr.revenue) || 0), 0);
    const totalMembers = (memberData || []).reduce((acc, curr) => acc + (Number(curr.members) || 0), 0);

    return (
        // @ts-ignore
        <AdminLayout breadcrumbs={breadcrumbs as any}>
            <Head title="Premium Analytics | RoringBasketball" />

            <div className="flex flex-col gap-8 p-8 italic font-medium">
                
                {/* TOMBOL BACK */}
                <div>
                    <button 
                        onClick={() => window.history.back()} 
                        className="group flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-600 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                    </button>
                </div>

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                            DATA <span className="text-[#0056b3]">INSIGHTS</span>
                        </h1>
                        <p className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Zap size={14} className="text-yellow-500 fill-yellow-500" /> Live Database Synchronization
                        </p>
                    </div>

                    <div className="flex bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200">
                        <button 
                            onClick={() => setActiveTab('revenue')} 
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${
                                activeTab === 'revenue' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            <Wallet size={16} /> Revenue
                        </button>
                        <button 
                            onClick={() => setActiveTab('members')} 
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${
                                activeTab === 'members' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            <Users size={16} /> Members
                        </button>
                    </div>
                </div>

                {/* Main Diagram Section */}
                <div className="w-full bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                    <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={activeTab === 'revenue' ? revenueData : memberData}>
                                <defs>
                                    <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0056b3" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#0056b3" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="month" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#64748b', fontSize: 12, fontWeight: 900}} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tickFormatter={(v) => activeTab === 'revenue' ? `Rp${v/1000}k` : v}
                                    tick={{fill: '#64748b', fontSize: 12, fontWeight: 900}} 
                                />
                                <Tooltip 
                                    cursor={{stroke: '#0056b3', strokeWidth: 2, strokeDasharray: '5 5'}}
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px' }} 
                                    formatter={(v: any) => activeTab === 'revenue' ? `Rp ${Number(v).toLocaleString('id-ID')}` : `${v} Members`}
                                />
                                
                                {activeTab === 'revenue' ? (
                                    <>
                                        <Area type="stepAfter" dataKey="revenue" fill="url(#premiumGradient)" stroke="none" />
                                        <Line 
                                            type="monotone" 
                                            dataKey="revenue" 
                                            stroke="#0056b3" 
                                            strokeWidth={6} 
                                            dot={{ r: 8, fill: '#0056b3', strokeWidth: 4, stroke: '#fff' }}
                                        />
                                    </>
                                ) : (
                                    <Bar dataKey="members" radius={[20, 20, 20, 20]} barSize={60}>
                                        {memberData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={index % 2 === 0 ? '#0056b3' : '#0ea5e9'} 
                                                fillOpacity={0.8}
                                            />
                                        ))}
                                    </Bar>
                                )}
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between hover:rotate-1 transition-transform">
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Accumulated Revenue</p>
                        <h4 className="text-3xl font-black mt-4">Rp {totalRevenue.toLocaleString('id-ID')}</h4>
                    </div>

                    <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] text-slate-900 flex flex-col justify-between hover:-rotate-1 transition-transform">
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Total Active Members</p>
                        <h4 className="text-3xl font-black mt-4">{totalMembers} <span className="text-sm text-slate-400">Players</span></h4>
                    </div>

                    <div className="bg-[#0056b3] p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-[10px] uppercase font-black tracking-widest text-blue-200">System Integrity</p>
                            <h4 className="text-2xl font-black mt-4 italic uppercase">Verified</h4>
                        </div>
                        <Database size={100} className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}