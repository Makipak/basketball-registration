import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="bg-white min-h-screen flex flex-col justify-center p-6 selection:bg-orange-500">
            <Head title="Forgot password" />

            <div className="w-full max-w-sm mx-auto space-y-10 relative">
                {/* HEADER */}
                <div className="flex flex-col items-center text-center">
                    <div className="h-1.5 w-12 bg-orange-500 mb-6"></div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        FORGOT <span className="text-orange-500">ACCESS?</span>
                    </h1>
                    <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Recover Your Academy Account</p>
                </div>

                {/* STATUS MESSAGE */}
                {status && (
                    <div className="p-4 bg-green-50 border-l-4 border-green-500 text-[10px] font-black uppercase tracking-widest text-green-700">
                        {status}
                    </div>
                )}

                <div className="space-y-6">
                    <Form {...email.form()}>
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="email">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        autoFocus
                                        /* Style input putih & tajam */
                                        className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-blue-600 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                                </div>

                                <div className="mt-6 flex items-center justify-start">
                                    <Button
                                        className="w-full bg-[#020617] hover:bg-orange-500 text-white font-black uppercase tracking-[0.3em] text-xs h-14 rounded-none transition-all duration-500 active:scale-[0.97] shadow-lg shadow-slate-200"
                                        disabled={processing}
                                        data-test="email-password-reset-link-button"
                                    >
                                        {processing && (
                                            <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                        )}
                                        Send Reset Link
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    <div className="text-center pt-2">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                            Remembered?{' '}
                            <TextLink 
                                href={login()} 
                                className="text-blue-600 hover:text-orange-500 font-black transition-colors underline underline-offset-4 decoration-blue-600/20"
                            >
                                BACK TO LOGIN
                            </TextLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
};