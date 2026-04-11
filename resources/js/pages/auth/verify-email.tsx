import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { MailCheck } from 'lucide-react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <div className="bg-white min-h-screen flex flex-col justify-center p-6 selection:bg-orange-500">
            <Head title="Email verification" />

            <div className="w-full max-w-sm mx-auto space-y-10 text-center">
                {/* ICON & HEADER */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                        <MailCheck className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        VERIFY <span className="text-blue-600">EMAIL</span>
                    </h1>
                    <p className="mt-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                        Please verify your email address by clicking on the link we just emailed to you.
                    </p>
                </div>

                {/* STATUS ALERT */}
                {status === 'verification-link-sent' && (
                    <div className="p-4 bg-green-50 border-l-4 border-green-500 text-[10px] font-black uppercase tracking-widest text-green-700 text-left">
                        A new verification link has been sent to your email address.
                    </div>
                )}

                <div className="space-y-6">
                    <Form {...send.form()} className="space-y-4">
                        {({ processing }) => (
                            <Button 
                                disabled={processing} 
                                className="w-full bg-[#020617] hover:bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-xs h-14 rounded-none transition-all duration-500 active:scale-[0.97]"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Resend Verification
                            </Button>
                        )}
                    </Form>

                    <div className="pt-2">
                        <TextLink
                            href={logout()}
                            className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-[0.2em] transition-colors"
                        >
                            LOG OUT
                        </TextLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

VerifyEmail.layout = {
    title: 'Verify email',
};