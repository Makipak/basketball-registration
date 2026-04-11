import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        /* BACKROUND JADI PUTIH BERSIH */
        <div className="bg-white min-h-screen flex flex-col justify-center selection:bg-orange-500 p-6">
            <Head title="Log In" />

            <div className="w-full max-w-sm mx-auto space-y-10 relative">
                {/* HEADLINE SECTION */}
                <div className="flex flex-col items-center text-center">
                    <div className="h-1.5 w-12 bg-blue-600 mb-6"></div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        PLAYER <span className="text-blue-600 text-3xl">LOGIN</span>
                    </h1>
                    <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Access Your Academy Dashboard</p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-5">
                                {/* EMAIL ADDRESS */}
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1" htmlFor="email">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        /* Styling input putih: bg-slate-50 & border-slate-200 */
                                        className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="your@email.com"
                                    />
                                    <InputError message={errors.email} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                                </div>

                                {/* PASSWORD */}
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between ml-1">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500" htmlFor="password">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-[10px] font-bold text-blue-500 hover:text-slate-900 uppercase tracking-wider transition-colors"
                                                tabIndex={5}
                                            >
                                                Forgot?
                                            </TextLink>
                                        )}
                                    </div>
                                    <PasswordInput
                                        id="password"
                                        className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-slate-900 placeholder:text-slate-300 h-12 transition-all duration-300"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                    />
                                    <InputError message={errors.password} className="mt-1 text-[10px] font-bold uppercase italic text-red-500" />
                                </div>

                                {/* REMEMBER ME */}
                                <div className="flex items-center space-x-3 group cursor-pointer w-fit ml-1">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        /* Checkbox disesuaikan warna bordernya */
                                        className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                    />
                                    <Label 
                                        htmlFor="remember" 
                                        className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 cursor-pointer uppercase tracking-widest transition-colors"
                                    >
                                        Keep me logged in
                                    </Label>
                                </div>

                                {/* LOGIN BUTTON */}
                                <Button
                                    type="submit"
                                    className="mt-4 w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.3em] text-xs h-14 rounded-none transition-all duration-500 active:scale-[0.97] shadow-lg shadow-slate-200"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing ? <Spinner className="mr-2" /> : null}
                                    Log In
                                </Button>
                            </div>

                            {canRegister && (
                                <div className="text-center pt-4">
                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                                        New Architect?{' '}
                                        <TextLink 
                                            href={register()} 
                                            tabIndex={5}
                                            className="text-blue-600 hover:text-orange-500 font-black transition-colors underline underline-offset-4 decoration-blue-600/20"
                                        >
                                            CREATE ACCOUNT
                                        </TextLink>
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </Form>

                {status && (
                    <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 text-[10px] font-black uppercase tracking-widest text-green-700">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}

Login.layout = {
    title: 'Login',
};