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
        <footer className="bg-[#0056b3] border-t border-white/10 py-6 md:pt-10 md:pb-5">
            <div className="container mx-auto px-5 md:px-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-8">
                    {/* Branding (mobile: logo kiri, ikon IG kanan) */}
                    <div className="md:col-span-5">
                        <div className="flex items-center justify-between md:justify-start md:gap-2.5 md:mb-3">
                            <div className="flex items-center gap-2">
                                <img src="/images/logo/Roar-P.webp" className="h-7 w-auto md:h-8" alt="Logo Roar Basketball Championship" />
                                <span className="text-base font-bold leading-none tracking-tighter uppercase text-white md:text-lg">
                                    Roar<span className="text-orange-500">basketball</span>
                                    <span className="mt-1 block text-[8px] tracking-[0.3em] text-white/70 md:text-[9px]">Championship</span>
                                </span>
                            </div>
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram Roar Basketball"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-orange-500 hover:bg-orange-500 md:hidden"
                            >
                                <Instagram size={15} />
                            </a>
                        </div>
                        <p className="hidden max-w-xs text-xs font-medium leading-relaxed text-blue-100 md:block">
                            Membentuk karakter dan talenta basket masa depan dengan kurikulum profesional di Kota Serang.
                        </p>
                    </div>

                    {/* Navigasi */}
                    <div className="md:col-span-3">
                        <h6 className="mb-3 hidden text-[10px] font-bold uppercase tracking-widest text-blue-200/60 md:block">Navigasi</h6>
                        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold uppercase tracking-wider text-white md:flex-col md:gap-x-0 md:gap-y-2">
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
                    <div className="md:col-span-4">
                        <h6 className="mb-3 hidden text-[10px] font-bold uppercase tracking-widest text-blue-200/60 md:block">Kontak</h6>
                        <div className="space-y-1.5 text-[11px] font-medium leading-snug text-white">
                            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 transition-colors hover:text-orange-500">
                                <MapPin size={13} className="mt-px shrink-0 text-orange-500" />
                                <span>Ancol Hoops, Jl. Karang Bolong Raya No. 8, Ancol, Jakarta Utara</span>
                            </a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-orange-500">
                                <Phone size={13} className="shrink-0 text-orange-500" />
                                <span>{PHONE_DISPLAY}</span>
                            </a>
                            {/* IG teks hanya di desktop; di mobile sudah ada ikon di atas */}
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 font-bold text-orange-500 transition-colors hover:text-orange-400 md:flex">
                                <Instagram size={13} className="shrink-0" />
                                <span className="break-all">{INSTAGRAM_HANDLE}</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-3 text-center text-[9px] font-semibold uppercase tracking-widest text-blue-200/60 md:mt-8 md:pt-4 md:text-left md:text-[10px]">
                    &copy; {new Date().getFullYear()} Roar Basketball. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
