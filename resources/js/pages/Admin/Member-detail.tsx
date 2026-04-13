import AdminLayout from '@/components/sidebar-admin';
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft, Mail, Phone, GraduationCap, 
    User, CheckCircle2, ShieldCheck, 
    CalendarDays, Hash 
} from 'lucide-react';

interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    program: string;
    status: string;
    school: string;
    age: number;
    created_at: string;
}

interface Props {
    member: Member;
}

export default function MemberDetail({ member }: Props) {
    const joinedDate = member?.created_at 
        ? new Date(member.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        : 'Unknown';

    return (
        <AdminLayout>
            <Head title={`Profile: ${member?.name}`} />

            <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 animate-fade-in">
                
                {/* HEADER NAVIGATION */}
                <div className="space-y-1">
                    <Link 
                        href="/admin/member" 
                        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-[9px] uppercase tracking-widest group"
                    >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Database
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter text-slate-900 uppercase">
                        Athlete <span className="text-blue-600">Profile.</span>
                    </h1>
                </div>

                <div className="space-y-6">
                    {/* PROFILE CARD */}
                    <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[80px] -mr-8 -mt-8 group-hover:bg-blue-50 transition-colors duration-500" />
                        
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 relative z-10">
                            {/* AVATAR - Ukuran dinamis sesuai layar */}
                            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-[24px] md:rounded-[32px] bg-slate-900 flex items-center justify-center text-white text-4xl md:text-5xl font-black shadow-xl shadow-slate-200 group-hover:bg-blue-600 transition-colors duration-500">
                                {member?.name?.substring(0, 1) || 'A'}
                            </div>

                            <div className="flex-1 space-y-6 w-full">
                                {/* NAME & STATUS HEADER */}
                                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[8px] font-black uppercase tracking-widest border border-blue-100">
                                                Official Member
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight lowercase first-letter:uppercase leading-tight">
                                            {member?.name || 'Loading...'}
                                        </h2>
                                        <p className="flex items-center justify-center md:justify-start gap-1.5 text-slate-400 font-bold text-xs mt-1">
                                            <Hash className="w-3 h-3 text-blue-600" /> ID: ATH-{member?.id?.toString().padStart(4, '0')}
                                        </p>
                                    </div>

                                    {/* STATUS BADGE */}
                                    <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 shrink-0">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                            {member?.status || 'Active'}
                                        </span>
                                    </div>
                                </div>

                                {/* INFO GRID - Di Mobile 1 kolom, Tablet 2, Desktop 3 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 pt-8 border-t border-slate-50">
                                    <DetailItem icon={<GraduationCap />} label="School / Campus" value={member?.school || '-'} />
                                    <DetailItem icon={<User />} label="Age / Eligibility" value={`${member?.age || 0} Years Old`} />
                                    <DetailItem icon={<Mail />} label="Email Address" value={member?.email || '-'} />
                                    <DetailItem icon={<Phone />} label="Phone Number" value={member?.phone || '-'} />
                                    <DetailItem icon={<CheckCircle2 />} label="Active Program" value={member?.program || '-'} />
                                    <DetailItem icon={<CalendarDays />} label="Member Since" value={joinedDate} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SYSTEM FOOTER - Responsif (Stack di Mobile) */}
                    <div className="bg-slate-50/50 p-6 md:p-8 rounded-[28px] border border-dashed border-slate-200 flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                        <div className="w-12 h-12 shrink-0 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-emerald-500 shadow-sm">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Security & Verification</h3>
                            <p className="text-slate-500 font-medium leading-relaxed text-[11px] md:text-xs">
                                Profile ini merupakan data resmi atlet <span className="text-slate-900 font-bold">Roringbasketball Academy</span>. 
                                Perubahan data hanya dapat dilakukan melalui otoritas admin utama melalui panel kontrol pusat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}} />
        </AdminLayout>
    );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="space-y-1 group/item">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover/item:text-blue-500 transition-colors">
                {label}
            </p>
            <div className="flex items-center gap-3 text-slate-700 font-bold">
                <span className="text-slate-300 w-4 h-4 group-hover/item:text-blue-600 transition-colors shrink-0">
                    {icon}
                </span>
                <span className="tracking-tight text-sm md:text-base break-words min-w-0 flex-1">
                    {value}
                </span>
            </div>
        </div>
    );
}