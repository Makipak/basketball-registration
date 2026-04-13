import { Head, useForm } from '@inertiajs/react';
import { 
    User, Mail, Phone, Trophy, ChevronRight, 
    ArrowLeft, Upload, Info, ShieldCheck, 
    CalendarDays, Copy, Check, School, MapPin
} from 'lucide-react';
import { useState } from 'react';

const PROGRAMS = [
    { id: 'junior', name: 'Junior Elite', price: 450000, label: 'Rp 450.000', category: 'U-16 to U-21' },
    { id: 'pro', name: 'Pro Prospect', price: 600000, label: 'Rp 600.000', category: 'All Ages' },
    { id: 'private', name: 'Private Camp', price: 200000, label: 'Mulai Rp 200.000', category: 'Personal Training' },
];

export default function MemberRegistration() {
    const [preview, setPreview] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const accountNo = "88301234567";

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '', // Field email sudah ada di state
        phone: '',
        age: '',
        school: '', 
        program_type: 'junior',
        address: '',
        payment_proof: null as File | null,
    });

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNo);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('payment_proof', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/program/member', {
            forceFormData: true,
            onSuccess: () => {
                alert('Pendaftaran berhasil dikirim!');
            }
        }); 
    };

    const selectedProgram = PROGRAMS.find(p => p.id === data.program_type);

    return (
        <div className="bg-[#f8fafc] min-h-screen p-4 md:p-8 lg:p-12 font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Registration & Payment | RoringBasketball" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                
                {/* LEFT SIDE: SUMMARY & INSTRUCTIONS */}
                <div className="lg:col-span-5 space-y-8 animate-fade-in-left">
                    <button 
                        onClick={() => window.history.back()} 
                        className="group flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-600 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                    </button>

                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                            </span>
                            Registration Open
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] text-slate-950">
                            STEP <br /><span className="text-blue-600">UP.</span>
                        </h1>
                        <p className="text-slate-600 font-bold text-sm max-w-xs leading-relaxed">
                            Amankan slot latihanmu sekarang dan bergabunglah dengan tim elit Roringbasketball Academy.
                        </p>
                    </div>

                    {/* PAYMENT DESTINATION CARD */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6 shadow-2xl shadow-slate-200/60 transition-all hover:border-blue-200">
                        <div className="flex items-center justify-between">
                            <div className="bg-slate-950 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">BCA Transfer</div>
                            <ShieldCheck className="w-6 h-6 text-green-500" />
                        </div>
                        
                        <div className="space-y-3">
                            <div 
                                onClick={handleCopy}
                                className="group relative cursor-pointer bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-400 transition-all active:scale-95"
                            >
                                <p className="text-3xl font-black tracking-tight text-slate-950 select-all">
                                    8830 1234 567
                                </p>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    {copied ? (
                                        <div className="flex items-center gap-1 text-green-600 font-black text-[10px] uppercase tracking-widest">
                                            <Check className="w-4 h-4" /> Copied
                                        </div>
                                    ) : (
                                        <Copy className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                    )}
                                </div>
                            </div>
                            <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest px-1">A/N RORING BASKETBALL ACADEMY</p>
                        </div>
                        
                        <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-dashed border-blue-200">
                            <Info className="w-4 h-4 text-blue-600 shrink-0" />
                            <p className="text-[10px] font-black text-slate-600 uppercase leading-tight">Pastikan nominal sesuai dengan paket yang dipilih.</p>
                        </div>
                    </div>

                    {/* AMOUNT DUE BOX */}
                    <div className="bg-blue-600 p-8 text-white rounded-[2.5rem] shadow-2xl shadow-blue-300 transition-transform hover:scale-[1.02]">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Checkout Summary</span>
                            <Trophy className="w-5 h-5 text-blue-200" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter italic uppercase mb-2">
                            {selectedProgram?.label}
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <p className="text-white font-black text-[10px] uppercase tracking-widest opacity-90">
                                {selectedProgram?.name} — {selectedProgram?.category}
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: REGISTRATION FORM */}
                <div className="lg:col-span-7 bg-white rounded-[3rem] border border-slate-200 p-8 md:p-12 shadow-2xl shadow-slate-200/40 animate-fade-in-up">
                    <form onSubmit={submit} className="space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* PROGRAM SELECT */}
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">Choose Program</label>
                                <div className="relative">
                                    <select 
                                        value={data.program_type}
                                        onChange={e => setData('program_type', e.target.value)}
                                        className="w-full h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none px-6 font-black uppercase text-slate-950 text-[13px] tracking-widest transition-all cursor-pointer appearance-none shadow-sm"
                                    >
                                        {PROGRAMS.map(prog => (
                                            <option key={prog.id} value={prog.id} className="text-slate-900">{prog.name} ({prog.category})</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
                                    </div>
                                </div>
                            </div>

                            {/* ATHLETE NAME */}
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">Full Name (Nama Atlet)</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input 
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none pl-14 pr-6 font-bold text-slate-950 text-[14px] transition-all shadow-sm placeholder:text-slate-400"
                                        placeholder="Nama lengkap pendaftar"
                                        required
                                    />
                                </div>
                                {errors.name && <div className="text-red-500 text-xs font-bold mt-1 ml-2 uppercase tracking-widest">{errors.name}</div>}
                            </div>

                            {/* EMAIL ADDRESS - NEW FIELD */}
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input 
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none pl-14 pr-6 font-bold text-slate-950 text-[14px] transition-all shadow-sm placeholder:text-slate-400"
                                        placeholder="contoh@email.com"
                                        required
                                    />
                                </div>
                                {errors.email && <div className="text-red-500 text-xs font-bold mt-1 ml-2 uppercase tracking-widest">{errors.email}</div>}
                            </div>

                            {/* SCHOOL ORIGIN */}
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">School (Asal Sekolah)</label>
                                <div className="relative group">
                                    <School className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input 
                                        type="text"
                                        value={data.school}
                                        onChange={e => setData('school', e.target.value)}
                                        className="w-full h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none pl-14 pr-6 font-bold text-slate-950 text-[14px] transition-all shadow-sm placeholder:text-slate-400"
                                        placeholder="Contoh: SMA Negeri 1 Serang"
                                        required
                                    />
                                </div>
                            </div>

                            {/* AGE & PHONE */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">Age (Umur)</label>
                                <div className="relative group">
                                    <CalendarDays className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input 
                                        type="number"
                                        value={data.age}
                                        onChange={e => setData('age', e.target.value)}
                                        className="w-full h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none pl-14 pr-6 font-bold text-slate-950 text-[14px] transition-all shadow-sm"
                                        placeholder="Umur"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">WhatsApp Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input 
                                        type="tel"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none pl-14 pr-6 font-bold text-slate-950 text-[14px] transition-all shadow-sm"
                                        placeholder="0812xxxx"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* UPLOAD SECTION */}
                        <div className="space-y-4">
                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">Proof of Payment (Bukti Transfer)</label>
                            <div className="relative">
                                <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept="image/*" />
                                <label 
                                    htmlFor="file-upload" 
                                    className={`flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-dashed transition-all cursor-pointer rounded-[2rem]
                                    ${preview ? 'border-blue-600 bg-blue-50/20' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-blue-400'}`}
                                >
                                    {preview ? (
                                        <div className="p-4 flex items-center gap-6">
                                            <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded-2xl shadow-lg border-2 border-white" />
                                            <div>
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Image Uploaded</p>
                                                <p className="text-[9px] text-slate-500 uppercase font-black">Click to change</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-center p-6">
                                            <Upload className="w-8 h-8 text-blue-600 mb-2" />
                                            <span className="text-[11px] font-black text-slate-950 uppercase tracking-widest">Upload Receipt</span>
                                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight italic mt-1">PNG, JPG up to 5MB</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {errors.payment_proof && <div className="text-red-500 text-xs font-bold mt-1 ml-2 uppercase tracking-widest">{errors.payment_proof}</div>}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button 
                            disabled={processing || !data.payment_proof}
                            className="w-full h-20 bg-slate-950 hover:bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[13px] transition-all flex items-center justify-center group disabled:opacity-30 shadow-xl shadow-slate-300"
                        >
                            {processing ? 'Processing...' : 'Complete Registration'}
                            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>

            {/* CUSTOM ANIMATIONS */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in-left {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-left { animation: fade-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
            `}} />
        </div>
    );
}