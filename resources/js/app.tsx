// import { createInertiaApp } from '@inertiajs/react';
// import { Toaster } from '@/components/ui/sonner';
// import { TooltipProvider } from '@/components/ui/tooltip';
// import { initializeTheme } from '@/hooks/use-appearance';
// import AppLayout from '@/layouts/app-layout';
// import AuthLayout from '@/layouts/auth-layout';
// import SettingsLayout from '@/layouts/settings/layout';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => (title ? `${title} - ${appName}` : appName),
//     layout: () => null,
//     strictMode: true,
//     withApp(app) {
//         return (
//             <TooltipProvider delayDuration={0}>
//                 {app}
//                 <Toaster />
//             </TooltipProvider>
//         );
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });

// // This will set light / dark mode on load...
// initializeTheme();
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title: string) => (title ? `${title} - ${appName}` : appName),

    resolve: (name: string) => 
    resolvePageComponent(
        `./Pages/${name}.tsx`, 
        import.meta.glob('./Pages/**/*.tsx')
    ) as Promise<any>, // Tambahkan 'as Promise<any>' untuk bypass type check sementara

    setup({ el, App, props }: any) {
        const root = createRoot(el);

        root.render(
            <TooltipProvider delayDuration={0}>
                <App {...props} />
                <Toaster />
            </TooltipProvider>
        );
    },

    progress: {
        color: '#4B5563',
    },
});

initializeTheme();