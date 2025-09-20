import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const {
        auth: { user },
        totalLinks,
        totalUsers,
        totalClicks,
    } = usePage<SharedData>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div
                    className={
                        `grid auto-rows-min gap-4 ` +
                        (user && user.role === 'admin'
                            ? 'md:grid-cols-3'
                            : 'md:grid-cols-2')
                    }
                >
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/70 text-center dark:bg-black/70">
                            <h3 className="font-semibold">All Links</h3>

                            <p>
                                <span className="text-3xl font-bold">{String(totalLinks)}</span> links
                            </p>
                        </div>
                    </div>
                    {user && user.role === 'admin' && (
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/70 text-center dark:bg-black/70">
                                    <h3 className="font-semibold">Total Users</h3>
                                    <p>
                                        <span className="text-3xl font-bold">{String(totalUsers)}</span> users
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/70 text-center dark:bg-black/70">
                                <h3 className="font-semibold">Total Clicks</h3>
                                <p>
                                    <span className="text-3xl font-bold">{String(totalClicks)}</span> clicks
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
