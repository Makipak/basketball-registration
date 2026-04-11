import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        /* WRAPPER PUTIH */
        <div className="bg-white min-h-screen flex flex-col justify-center p-6 selection:bg-orange-500">
            <Head title="Reset password" />

            <div className="w-full max-w-sm mx-auto space-y-10">
                {/* HEADER */}
                <div className="flex flex-col items-center text-center">
                    <div className="h-1.5 w-12 bg-blue-600 mb-6"></div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        NEW <span className="text-blue-600">PASSWORD</span>
                    </h1>
                    <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Secure Your Academy Account</p>
                </div>

                <Form
                    {...update.form()}
                    transform={(data) => ({ ...data, token, email })}
                    resetOnSuccess={['password', 'password_confirmation']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-6">
                            {/* EMAIL (Read Only) */}
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    className="bg-slate-100 border-slate-200 rounded-none text-slate-500 h-12 cursor-not-allowed"
                                    readOnly
                                />
                                <InputError message={errors.email} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                            </div>

                            {/* NEW PASSWORD */}
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="password">New Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                    className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                    autoFocus
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="password_confirmation">
                                    Confirm password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password_confirmation} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-blue-600 hover:bg-[#020617] text-white font-black uppercase tracking-[0.3em] text-xs h-14 rounded-none transition-all duration-500 active:scale-[0.97] shadow-lg shadow-blue-600/10"
                                disabled={processing}
                                data-test="reset-password-button"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Update Password
                            </Button>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}

ResetPassword.layout = {
    title: 'Reset password',
};