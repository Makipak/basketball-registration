import { Head, useForm } from '@inertiajs/react';
import { 
    User, Mail, Phone, Trophy, CreditCard, 
    ChevronRight, ArrowLeft, Upload, CheckCircle2, 
    Info, ShieldCheck, MapPin
} from 'lucide-react';
import { useState, useEffect } from 'react';

const PROGRAMS = [
    { id: 'junior', name: 'Junior Elite', price: 450000, label: 'Rp 450.000', category: 'U-16 to U-21' },
    { id: 'pro', name: 'Pro Prospect', price: 600000, label: 'Rp 600.000', category: 'All Ages' },
    { id: 'private', name: 'Private Camp', price: 200000, label: 'Mulai Rp 200.000', category: 'Personal Training' },
];

export default function MemberRegistration() {
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        program_type: 'junior',
        address: '',
        payment_proof: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('payment_proof', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/program/member'); 
    };

    const selectedProgram = PROGRAMS.find(p => p.id === data.program_type);

    return (
        <div className="bg-[#f8fafc] min-h-screen p-4 md:p-12 font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Registration & Payment | RoringBasketball" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* LEFT SIDE: PAYMENT & BILLING SUMMARY */}
                <div className="lg:col-span-5 space-y-8 animate-fade-in-left">
                    <button 
                        onClick={() => window.history.back()} 
                        className="group flex items-center text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-blue-600 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Academy
                    </button>

                    <div className="space-y-4">
                        <div className="inline-block bg-blue-600 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest italic">
                            Official Registration
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] text-slate-900">
                            SECURE <br /><span className="text-blue-600">PAYMENT</span>
                        </h1>
                    </div>

                    {/* PAYMENT DESTINATION CARD */}
                    <div className="relative overflow-hidden bg-white border-2 border-slate-900 p-8 space-y-6 shadow-[12px_12px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        <div className="flex items-center gap-3 text-blue-600 font-black uppercase text-[10px] tracking-widest">
                            <ShieldCheck className="w-4 h-4" /> Official Bank Account
                        </div>
                        
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bank Central Asia (BCA)</p>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-black tracking-tight text-slate-900">8830 1234 567</p>
                                <button className="text-[9px] font-black bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 uppercase">Copy</button>
                            </div>
                            <p className="text-xs font-bold uppercase text-slate-500">A/N RORING BASKETBALL ACADEMY</p>
                        </div>
                        
                        <div className="h-px bg-slate-100 w-full"></div>
                        
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase italic">Verifikasi Instant oleh Admin</span>
                        </div>
                    </div>

                    {/* TOTAL AMOUNT BOX */}
                    <div className="bg-slate-900 p-10 text-white rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-600/30 transition-all duration-700"></div>
                        
                        <div className="flex justify-between items-start relative z-10">
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">Amount Due</span>
                            <CreditCard className="w-6 h-6 text-white/20" />
                        </div>
                        
                        <div className="mt-4 space-y-1 relative z-10">
                            <h2 className="text-5xl font-black tracking-tighter italic uppercase">
                                {selectedProgram?.label}
                            </h2>
                            <p className="text-blue-400 font-bold text-xs uppercase tracking-widest">
                                {selectedProgram?.name} — {selectedProgram?.category}
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4 relative z-10">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                                        <img src={`/images/team/team-1.jpg`} className="w-full h-full object-cover" alt="member" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed max-w-[200px]">
                                Join 1,200+ athletes who already joined this season.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: REGISTRATION FORM */}
                <div className="lg:col-span-7 bg-white border-[6px] border-slate-900 p-8 md:p-14 shadow-2xl animate-fade-in-up">
                    <form onSubmit={submit} className="space-y-10">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* PROGRAM SELECT */}
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-widest flex items-center text-slate-900">
                                    <Trophy className="w-4 h-4 mr-2 text-blue-600" /> Choose Program
                                </label>
                                <div className="relative">
                                    <select 
                                        value={data.program_type}
                                        onChange={e => setData('program_type', e.target.value)}
                                        className="w-full h-16 border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 focus:outline-none px-6 font-black uppercase text-[12px] tracking-widest bg-slate-50 transition-all cursor-pointer appearance-none"
                                    >
                                        {PROGRAMS.map(prog => (
                                            <option key={prog.id} value={prog.id} className="text-slate-900 font-bold">
                                                {prog.name} ({prog.category})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronRight className="w-5 h-5 rotate-90 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* FULL NAME */}
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-widest flex items-center text-slate-900">
                                    <User className="w-4 h-4 mr-2 text-blue-600" /> Athlete Name
                                </label>
                                <input 
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full h-16 border-2 border-slate-200 focus:border-blue-600 focus:outline-none px-6 font-bold uppercase text-[12px] bg-slate-50 transition-all placeholder:text-slate-300"
                                    placeholder="Enter full name..."
                                    required
                                />
                                {errors.name && <p className="text-[10px] font-black text-red-600 italic uppercase">{errors.name}</p>}
                            </div>

                            {/* EMAIL & PHONE */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-widest flex items-center text-slate-900">
                                    <Mail className="w-4 h-4 mr-2 text-blue-600" /> Contact Email
                                </label>
                                <input 
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full h-16 border-2 border-slate-200 focus:border-blue-600 focus:outline-none px-6 font-bold text-[12px] bg-slate-50 transition-all"
                                    placeholder="example@mail.com"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-widest flex items-center text-slate-900">
                                    <Phone className="w-4 h-4 mr-2 text-blue-600" /> Phone Number
                                </label>
                                <input 
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full h-16 border-2 border-slate-200 focus:border-blue-600 focus:outline-none px-6 font-bold text-[12px] bg-slate-50 transition-all"
                                    placeholder="0812..."
                                    required
                                />
                            </div>
                        </div>

                        {/* UPLOAD SECTION */}
                        <div className="space-y-4 pt-4 border-t-2 border-slate-100">
                            <div className="flex justify-between items-center">
                                <label className="text-[11px] font-black uppercase tracking-widest flex items-center text-slate-900">
                                    <Upload className="w-4 h-4 mr-2 text-blue-600" /> Payment Receipt
                                </label>
                                <span className="text-[9px] font-bold text-slate-400 uppercase italic">Max 5MB (JPG, PNG)</span>
                            </div>
                            
                            <div className="relative group">
                                <input 
                                    type="file" 
                                    onChange={handleFileChange}
                                    className="hidden" 
                                    id="file-upload"
                                    accept="image/*"
                                />
                                <label 
                                    htmlFor="file-upload" 
                                    className={`flex flex-col items-center justify-center w-full min-h-[200px] border-4 border-dashed transition-all cursor-pointer rounded-3xl
                                    ${preview ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
                                >
                                    {preview ? (
                                        <div className="p-6 flex flex-col items-center animate-scale-in">
                                            <div className="relative">
                                                <img src={preview} alt="Preview" className="h-40 object-contain rounded-xl shadow-2xl mb-4 border-4 border-white" />
                                                <div className="absolute -top-3 -right-3 bg-green-500 text-white p-1 rounded-full shadow-lg">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </div>
                                            </div>
                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                                Captured Successfully • Click to Change
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center space-y-3 group-hover:scale-110 transition-transform duration-500">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                <Upload className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div className="text-center">
                                                <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest block">Upload Transfer Proof</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight italic">Drag and drop or click to browse</span>
                                            </div>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {errors.payment_proof && <p className="text-[10px] font-black text-red-600 uppercase italic">{errors.payment_proof}</p>}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-6">
                            <button 
                                disabled={processing || !data.payment_proof}
                                type="submit"
                                className="w-full h-24 bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-[0.5em] text-[14px] transition-all flex items-center justify-center group disabled:opacity-20 disabled:grayscale relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                <span className="relative z-10 flex items-center">
                                    {processing ? 'UPLOADING DATA...' : 'FINALIZE REGISTRATION'} 
                                    <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-3 transition-transform" />
                                </span>
                            </button>
                            <p className="text-center mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest italic flex items-center justify-center gap-2">
                                <Info className="w-3 h-3" /> Data is encrypted and sent to our secure servers.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in-left {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scale-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-left { animation: fade-in-left 0.8s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out 0.2s forwards; opacity: 0; }
                .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}} />
        </div>
    );
}