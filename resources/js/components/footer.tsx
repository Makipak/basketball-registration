import { Link } from '@inertiajs/react';
import { Instagram, MapPin, Phone } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Coach', href: '/coach' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
];

const INSTAGRAM_URL = 'https://www.instagram.com/roarbasketball_championship/';
const INSTAGRAM_HANDLE = '@roarbasketball_championship';
const PHONE_DISPLAY = '(+62) 822-6622-9901';
const WHATSAPP_URL = 'https://wa.me/6282266229901';
const MAPS_URL = 'https://www.google.com/maps?q=Ancol%20Hoops%2C%20Jakarta';

export function Footer() {
    return (
        <footer className="bg-[#0056b3] border-t border-white/10 py-8 md:pt-10 md:pb-5">
            <div className="container mx-auto px-5 md:px-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">

                    {/* Branding */}
                    <div className="md:col-span-5">
                        <div className="mb-3 flex items-center gap-2.5">
                            <img src="/images/logo/Roar-P.webp" className="h-8 w-auto" alt="Logo Roar Basketball Championship" />
                            <span className="text-lg font-bold leading-none tracking-tighter uppercase text-white">
                                Roar<span className="text-orange-500">basketball</span>
                                <span className="mt-1 block text-[9px] tracking-[0.3em] text-white/70">Championship</span>
                            </span>
                        </div>
                        <p className="max-w-xs text-xs font-medium leading-relaxed text-blue-100">
                            Membentuk karakter dan talenta basket masa depan dengan kurikulum profesional di Kota Serang.
                        </p>
                    </div>

                    {/* Navigasi: daftar ke bawah */}
                    <div className="border-t border-white/10 pt-5 md:col-span-3 md:border-0 md:pt-0">
                        <h6 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-blue-200/60">Navigasi</h6>
                        <ul className="flex flex-col gap-y-2.5 text-[11px] font-semibold uppercase tracking-wider text-white md:gap-y-2">
                            {navLinks.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="transition-colors hover:text-orange-500">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div className="border-t border-white/10 pt-5 md:col-span-4 md:border-0 md:pt-0">
                        <h6 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-blue-200/60">Kontak</h6>
                        <div className="space-y-3 text-xs font-medium leading-snug text-white md:space-y-2 md:text-[11px]">
                            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 transition-colors hover:text-orange-500">
                                <MapPin size={14} className="mt-px shrink-0 text-orange-500" />
                                <span>Ancol Hoops, Jl. Karang Bolong Raya No. 8, Ancol, Jakarta Utara</span>
                            </a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-orange-500">
                                <Phone size={14} className="shrink-0 text-orange-500" />
                                <span>{PHONE_DISPLAY}</span>
                            </a>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-bold text-orange-500 transition-colors hover:text-orange-400">
                                <Instagram size={14} className="shrink-0" />
                                <span className="break-all">{INSTAGRAM_HANDLE}</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 text-center text-[9px] font-semibold uppercase tracking-widest text-blue-200/60 md:mt-8 md:text-left md:text-[10px]">
                    &copy; {new Date().getFullYear()} Roar Basketball Championship. All rights reserved.
                </div>
            </div>
        </footer>
    );
}