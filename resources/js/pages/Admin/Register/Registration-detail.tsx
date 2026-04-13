import AdminLayout from '@/components/sidebar-admin';
import { Head, router } from '@inertiajs/react';
import { 
    ArrowLeft, CheckCircle, XCircle, 
    Mail, Phone, School, Calendar, 
    User, Target, CreditCard, ExternalLink,
    Clock
} from 'lucide-react';

interface Registration {
    id: number;
    name: string;
    email: string;
    phone: string;
    program: string;
    age: number;
    school: string;
    status: string;
    date: string;
    payment_proof_url: string;
}

interface Props {
    registration: Registration;
}

export default function RegistrationDetail({ registration }: Props) {
    
    const handleAccept = () => {
        if(confirm('Terima pendaftar ini?')) {
            router.post(`/admin/registrations/${registration.id}/accept`);
        }
    };

    const handleReject = () => {
        if(confirm('Tolak pendaftaran ini?')) {
            router.post(`/admin/registrations/${registration.id}/reject`);
        }
    };

    return (
        <AdminLayout>
            <Head title={`Detail ${registration.name} | RoringBasketball`} />

            <div className="max-w-5xl mx-auto space-y-8 pb-20">
                {/* BACK BUTTON & HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <button 
                            onClick={() => window.history.back()} 
                            className="group flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all"
                        >
                            <ArrowLeft className="w-3 h-3 mr-1 group-hover:-translate-x-1 transition-transform" /> 
                            Back to List
                        </button>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-slate-950">
                            Athlete <span className="text-blue-600">Profil.</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleReject}
                            className="flex-1 md:flex-none h-12 px-6 bg-white border-2 border-red-100 text-red-500 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                            <XCircle className="w-4 h-4" /> Reject
                        </button>
                        <button 
                            onClick={handleAccept}
                            className="flex-1 md:flex-none h-12 px-8 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-slate-950 transition-all shadow-lg shadow-blue-200"
                        >
                            <CheckCircle className="w-4 h-4" /> Approve Athlete
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: MAIN INFO */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* PERSONAL CARD */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8">
                                <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> {registration.status}
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row items-start gap-8">
                                <div className="w-24 h-24 rounded-[2rem] bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-blue-100">
                                    {registration.name.charAt(0)}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tight">{registration.name}</h2>
                                        <p className="text-blue-600 font-bold flex items-center gap-2 mt-1">
                                            <Target className="w-4 h-4" /> {registration.program} Program
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">School / Campus</p>
                                            <p className="font-bold text-slate-700 flex items-center gap-2"><School className="w-4 h-4 text-slate-400" /> {registration.school}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Age</p>
                                            <p className="font-bold text-slate-700 flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /> {registration.age} Years Old</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                                            <p className="font-bold text-slate-700 flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> {registration.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                                            <p className="font-bold text-slate-700 flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> {registration.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ADDITIONAL INFO / NOTES */}
                        <div className="bg-slate-50 rounded-[2rem] p-8 border-2 border-dashed border-slate-200">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Registration Summary</h3>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                Athlete registered for the <strong>{registration.program}</strong> program on <strong>{registration.date}</strong>. 
                                Please verify the payment proof and school credentials before approving. 
                                Once approved, the athlete will receive an automated welcome email and access to the membership area.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: PAYMENT PROOF */}
                    <div className="space-y-6">
                        <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Payment Proof</h3>
                                <CreditCard className="w-5 h-5 text-blue-500" />
                            </div>
                            
                            <div className="aspect-[3/4] w-full bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-4 group cursor-pointer overflow-hidden relative">
                                {/* Placeholder / Image Preview */}
                                <div className="text-center p-6 transition-transform group-hover:scale-105">
                                    <ExternalLink className="w-8 h-8 mx-auto mb-3 text-slate-700" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Click to View Full Document</p>
                                </div>
                                
                                <button 
                                    onClick={() => window.open(registration.payment_proof_url, '_blank')}
                                    className="absolute inset-0 w-full h-full opacity-0 bg-blue-600/10 transition-opacity hover:opacity-100"
                                />
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="font-black text-slate-500 uppercase">Applied On</span>
                                    <span className="font-bold">{registration.date}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="font-black text-slate-500 uppercase">Method</span>
                                    <span className="font-bold">Bank Transfer / QRIS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}