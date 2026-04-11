import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <div className="bg-white min-h-screen flex flex-col justify-center p-6 selection:bg-orange-500">
            <Head title="Confirm password" />

            <div className="w-full max-w-sm mx-auto space-y-10">
                {/* HEADER */}
                <div className="flex flex-col items-center text-center">
                    <div className="h-1.5 w-12 bg-slate-900 mb-6"></div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        SECURE <span className="text-blue-600">AREA</span>
                    </h1>
                    <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] leading-relaxed">
                        This is a secure area. Please confirm your password before continuing.
                    </p>
                </div>

                <Form {...store.form()} resetOnSuccess={['password']}>
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="password">
                                    Password
                                </Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    autoFocus
                                    className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-blue-600 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                />

                                <InputError message={errors.password} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                            </div>

                            <div className="flex items-center">
                                <Button
                                    className="w-full bg-[#020617] hover:bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-xs h-14 rounded-none transition-all duration-500 active:scale-[0.97] shadow-lg shadow-slate-200"
                                    disabled={processing}
                                    data-test="confirm-password-button"
                                >
                                    {processing && <Spinner className="mr-2" />}
                                    Verify Identity
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm your password',
};