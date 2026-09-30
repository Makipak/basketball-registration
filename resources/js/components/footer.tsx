import { Link } from '@inertiajs/react';

export function Footer() {
    return (
        <footer className="bg-[#0056b3] pt-20 pb-12 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Branding */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/images/logo/Roar-P.png" className="h-10 w-auto" alt="Logo Roar Basketball Championship" />
                            <span className="text-xl font-bold tracking-tighter uppercase text-white leading-none">
                                Roar<span className="text-orange-500">basketball</span>
                                <span className="block text-[10px] tracking-[0.3em] text-white/70 mt-1">Championship</span>
                            </span>
                        </div>
                        <p className="text-blue-100 text-sm max-w-sm mb-8 font-medium leading-relaxed">
                            Membentuk karakter dan talenta basket masa depan dengan kurikulum profesional di Kota Serang.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h6 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-blue-200/60">Navigasi</h6>
                        <ul className="space-y-3 text-white text-xs font-semibold uppercase tracking-wider">
                            <li><Link href="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
                            <li><Link href="/schedule" className="hover:text-orange-500 transition-colors">Schedule</Link></li>
                            <li><Link href="/coach" className="hover:text-orange-500 transition-colors">Coach</Link></li>
                            <li><Link href="/about" className="hover:text-orange-500 transition-colors">About</Link></li>
                            <li><Link href="/faq" className="hover:text-orange-500 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h6 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-blue-200/60">Kontak</h6>
                        <div className="text-white text-xs font-semibold uppercase tracking-wider leading-loose">
                            <p>Ancol Hoops</p>
                            <p>Jakarta, Indonesia</p>
                            <p className="mt-2 text-orange-500 font-black tracking-widest">@roarbasketball_championship</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}