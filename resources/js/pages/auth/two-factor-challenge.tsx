import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import { ShieldCheck, KeyRound } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery code',
                description:
                    'Confirm access by entering one of your emergency recovery codes.',
                toggleText: 'Use authentication code',
            };
        }

        return {
            title: '2FA Code',
            description:
                'Enter the code provided by your authenticator application.',
            toggleText: 'Use a recovery code',
        };
    }, [showRecoveryInput]);

    setLayoutProps({
        title: authConfigContent.title,
        description: authConfigContent.description,
    });

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <div className="bg-white min-h-screen flex flex-col justify-center p-6 selection:bg-orange-500">
            <Head title="Two-factor authentication" />

            <div className="w-full max-w-sm mx-auto space-y-10">
                {/* HEADER SECTION */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6">
                        {showRecoveryInput ? (
                            <KeyRound className="w-8 h-8 text-orange-500" />
                        ) : (
                            <ShieldCheck className="w-8 h-8 text-blue-600" />
                        )}
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        {showRecoveryInput ? 'RECOVERY' : 'SECURITY'}{' '}
                        <span className={showRecoveryInput ? 'text-orange-500' : 'text-blue-600'}>CHECK</span>
                    </h1>
                    <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] leading-relaxed max-w-[280px]">
                        {authConfigContent.description}
                    </p>
                </div>

                <Form
                    {...store.form()}
                    className="space-y-8"
                    resetOnError
                    resetOnSuccess={!showRecoveryInput}
                >
                    {({ errors, processing, clearErrors }) => (
                        <>
                            {showRecoveryInput ? (
                                <div className="grid gap-2">
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Enter recovery code"
                                        autoFocus={showRecoveryInput}
                                        required
                                        className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-0 focus-visible:border-orange-500 text-slate-900 h-12 transition-all"
                                    />
                                    <InputError message={errors.recovery_code} className="text-[10px] font-bold uppercase italic text-red-500" />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <InputOTP
                                        name="code"
                                        maxLength={OTP_MAX_LENGTH}
                                        value={code}
                                        onChange={(value) => setCode(value)}
                                        disabled={processing}
                                        pattern={REGEXP_ONLY_DIGITS}
                                    >
                                        <InputOTPGroup className="gap-2">
                                            {Array.from(
                                                { length: OTP_MAX_LENGTH },
                                                (_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                        className="h-14 w-11 rounded-none border-slate-200 text-lg font-black bg-slate-50 focus:border-blue-600 focus:ring-0"
                                                    />
                                                ),
                                            )}
                                        </InputOTPGroup>
                                    </InputOTP>
                                    <InputError message={errors.code} className="text-[10px] font-bold uppercase italic text-red-500" />
                                </div>
                            )}

                            <div className="space-y-6">
                                <Button
                                    type="submit"
                                    className={`w-full text-white font-black uppercase tracking-[0.3em] text-xs h-14 rounded-none transition-all duration-500 active:scale-[0.97] shadow-lg ${
                                        showRecoveryInput ? 'bg-orange-500 hover:bg-slate-900' : 'bg-[#020617] hover:bg-blue-600'
                                    }`}
                                    disabled={processing}
                                >
                                    {processing ? 'Verifying...' : 'Continue'}
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors underline underline-offset-4 decoration-slate-200"
                                        onClick={() =>
                                            toggleRecoveryMode(clearErrors)
                                        }
                                    >
                                        {authConfigContent.toggleText}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}