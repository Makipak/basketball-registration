import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        /* BACKGROUND JADI PUTIH */
        <div className="bg-white min-h-screen flex flex-col justify-center selection:bg-orange-500 p-6 relative overflow-hidden">
            <Head title="Join The Academy" />
            
            {/* Background Ornamen (Disesuaikan opasitasnya biar tetap soft di background putih) */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-orange-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-sm mx-auto space-y-10 relative z-10">
                {/* BRANDING MINI */}
                <div className="flex flex-col items-center text-center">
                    <div className="h-1.5 w-16 bg-blue-600 mb-6"></div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        JOIN THE <span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.1)]">ARCHITECTS</span>
                    </h1>
                    <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Roring Basketball Academy</p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-5">
                                {/* NAME */}
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="name">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        /* Input disesuaikan: bg-slate-50 dan border-slate-200, teks jadi gelap */
                                        className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Richard Roring"
                                    />
                                    <InputError message={errors.name} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                                </div>

                                {/* EMAIL */}
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="email">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="coach@roringbasketball.com"
                                    />
                                    <InputError message={errors.email} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                                </div>

                                {/* PASSWORD & CONFIRMATION */}
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="password">
                                            Password
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="••••••••"
                                        />
                                        <InputError message={errors.password} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="password_confirmation">
                                            Confirm Password
                                        </Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="••••••••"
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                                    </div>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <Button
                                    type="submit"
                                    className="mt-6 w-full bg-orange-600 hover:bg-[#020617] text-white font-black uppercase tracking-[0.3em] text-xs h-14 rounded-none transition-all duration-500 active:scale-[0.97] group shadow-lg shadow-blue-600/10"
                                    tabIndex={5}
                                    disabled={processing}
                                >
                                    {processing ? <Spinner className="mr-2" /> : "Sign Up"}
                                </Button>
                            </div>

                            <div className="text-center pt-2">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                                    Already a member?{' '}
                                    <TextLink 
                                        href={login()} 
                                        tabIndex={6}
                                        className="text-blue-600 hover:text-orange-600 transition-colors duration-300 underline underline-offset-4 decoration-blue-600/20"
                                    >
                                        LOGIN HERE
                                    </TextLink>
                                </p>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}

Register.layout = {
    title: 'Register',
};