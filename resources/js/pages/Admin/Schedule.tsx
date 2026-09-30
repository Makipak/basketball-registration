import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { route } from 'ziggy-js'; // ✅ Fix: import route dari ziggy-js
import AdminLayout from '@/components/sidebar-admin';
import { 
    Plus, Trash2, MapPin, X, 
    Save, Calendar, Clock, 
    Users, AlertCircle
} from 'lucide-react';

interface Schedule {
    id: number;
    day: string;
    time: string;
    duration: string;
    title: string;
    coach: string;
    court: string;
    category: string;
    intensity: string;
    status: string;
}

interface Props {
    schedules: Schedule[];
    breadcrumbs: any;
}

export default function ScheduleAdmin({ schedules, breadcrumbs }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    
    const { data, setData, post, reset, processing, errors } = useForm({
        day: 'Senin',
        time: '',
        duration: '120 min',
        title: '',
        coach: '',
        court: '',
        category: 'Junior',
        intensity: 'Medium',
        status: 'Tersedia'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.schedule.store'), {
            onSuccess: () => {
                setIsAdding(false);
                reset();
            },
            preserveScroll: true
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus jadwal ini secara permanen?')) {
            router.delete(route('admin.schedule.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const toggleStatus = (item: Schedule) => {
        const newStatus = item.status === 'Tersedia' ? 'Penuh' : 'Tersedia';
        router.put(route('admin.schedule.update', item.id), { 
            ...item,
            status: newStatus 
        }, { preserveScroll: true });
    };

    // ✅ Shared input className — teks hitam pekat agar tidak menyatu dengan background
    const inputCls = "w-full bg-white border-2 border-slate-300 rounded-xl p-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all";
    const selectCls = "w-full bg-white border-2 border-slate-300 rounded-xl p-4 text-sm font-bold text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all";

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Schedule | Admin" />

            <div className="p-8">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 font-medium italic">
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                            MANAGE <span className="text-blue-700">SCHEDULE</span>
                        </h1>
                        <p className="text-slate-600 text-sm font-bold mt-2 uppercase tracking-widest flex items-center gap-2 font-sans not-italic">
                            <Calendar size={16} className="text-blue-600" /> Control Training Sessions
                        </p>
                    </div>

                    <button 
                        onClick={() => setIsAdding(!isAdding)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl font-sans not-italic ${
                            isAdding 
                            ? 'bg-rose-600 text-white hover:bg-rose-700' 
                            : 'bg-slate-900 text-white hover:bg-blue-700'
                        }`}
                    >
                        {isAdding ? <X size={18} /> : <Plus size={18} />}
                        {isAdding ? 'Close Form' : 'Add New Session'}
                    </button>
                </div>

                {/* ✅ Form Section — semua label & input teks dibuat kontras */}
                {isAdding && (
                    <div className="mb-10 bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-300 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                        
                        {/* Form title */}
                        <div className="mb-6">
                            <h2 className="text-lg font-black uppercase text-slate-900 tracking-wide">
                                New Training Session
                            </h2>
                            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-widest">
                                Isi semua field lalu klik Publish
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans not-italic">
                            
                            {/* Timing Group */}
                            <div className="space-y-2">
                                <label className="block text-xs font-black uppercase text-slate-800 ml-1 mb-1">
                                    Hari & Waktu
                                </label>
                                <select 
                                    className={selectCls}
                                    value={data.day}
                                    onChange={e => setData('day', e.target.value)}
                                >
                                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                                <input 
                                    type="time" 
                                    className={inputCls}
                                    value={data.time}
                                    onChange={e => setData('time', e.target.value)}
                                    required
                                />
                                {errors.time && (
                                    <p className="text-rose-600 text-[11px] font-bold uppercase mt-1">{errors.time}</p>
                                )}
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-800 ml-1 mb-1">
                                        Durasi
                                    </label>
                                    <input
                                        placeholder="Contoh: 90 min"
                                        className={inputCls}
                                        value={data.duration}
                                        onChange={e => setData('duration', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Session Info Group */}
                            <div className="space-y-2">
                                <label className="block text-xs font-black uppercase text-slate-800 ml-1 mb-1">
                                    Info Sesi
                                </label>
                                <input 
                                    placeholder="Judul Sesi (contoh: Basic Dribbling)"
                                    className={inputCls}
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && (
                                    <p className="text-rose-600 text-[11px] font-bold uppercase mt-1">{errors.title}</p>
                                )}
                                <input 
                                    placeholder="Nama Coach"
                                    className={inputCls}
                                    value={data.coach}
                                    onChange={e => setData('coach', e.target.value)}
                                    required
                                />
                                {errors.coach && (
                                    <p className="text-rose-600 text-[11px] font-bold uppercase mt-1">{errors.coach}</p>
                                )}
                            </div>

                            {/* Court & Level Group */}
                            <div className="space-y-2">
                                <label className="block text-xs font-black uppercase text-slate-800 ml-1 mb-1">
                                    Lapangan & Level
                                </label>
                                <input 
                                    placeholder="Lokasi Lapangan (contoh: Court A)"
                                    className={inputCls}
                                    value={data.court}
                                    onChange={e => setData('court', e.target.value)}
                                    required
                                />
                                {errors.court && (
                                    <p className="text-rose-600 text-[11px] font-bold uppercase mt-1">{errors.court}</p>
                                )}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-700 ml-1 mb-1">Kategori</label>
                                        <select 
                                            className={selectCls}
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                        >
                                            <option value="Junior">Junior</option>
                                            <option value="Pro">Pro</option>
                                            <option value="Private">Private</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-700 ml-1 mb-1">Intensitas</label>
                                        <select 
                                            className={selectCls}
                                            value={data.intensity}
                                            onChange={e => setData('intensity', e.target.value)}
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="lg:col-span-3 bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                            >
                                {processing ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                ) : <Save size={18} />}
                                {processing ? 'Menyimpan...' : 'Confirm & Publish Schedule'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Table Section */}
                <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-xl overflow-hidden font-sans not-italic">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="p-6 text-[11px] uppercase font-black tracking-widest">Day & Time</th>
                                    <th className="p-6 text-[11px] uppercase font-black tracking-widest">Session Details</th>
                                    <th className="p-6 text-[11px] uppercase font-black tracking-widest">Location</th>
                                    <th className="p-6 text-[11px] uppercase font-black tracking-widest text-center">Status</th>
                                    <th className="p-6 text-[11px] uppercase font-black tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-50">
                                {schedules.map((item) => (
                                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-black text-slate-900 uppercase italic leading-none">{item.day}</span>
                                                <span className="text-[10px] font-bold text-blue-700 mt-1 flex items-center gap-1 uppercase">
                                                    <Clock size={12} /> {item.time.substring(0, 5)} — {item.duration}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-base font-black text-slate-900 uppercase italic leading-tight group-hover:text-blue-700 transition-colors">
                                                    {item.title}
                                                </span>
                                                <div className="flex gap-2 mt-1">
                                                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-slate-900 text-white uppercase">{item.category}</span>
                                                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-orange-500 text-white uppercase">{item.intensity}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-[11px] font-black text-slate-800 uppercase italic">
                                                    <MapPin size={12} className="text-blue-600" /> {item.court}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                                                    <Users size={12} /> Coach: {item.coach}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <button 
                                                onClick={() => toggleStatus(item)}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter border-2 transition-all shadow-sm ${
                                                    item.status === 'Tersedia' 
                                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 hover:bg-emerald-500 hover:text-white' 
                                                    : 'bg-rose-50 border-rose-500 text-rose-700 hover:bg-rose-500 hover:text-white'
                                                }`}
                                            >
                                                {item.status}
                                            </button>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="p-3 rounded-xl bg-slate-100 text-slate-400 hover:bg-rose-600 hover:text-white transition-all inline-flex items-center shadow-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {schedules.length === 0 && (
                        <div className="p-20 text-center flex flex-col items-center bg-slate-50/50">
                            <AlertCircle size={48} className="text-slate-200 mb-4" />
                            <h3 className="text-xl font-black uppercase text-slate-400 italic">Belum ada jadwal latihan</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase mt-1">Klik "Add New Session" untuk memulai</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}