import ModalAction from '@/components/modal-action';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { useShortLinkStore } from '@/store/useShortLinkStore';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function MyLinks() {
    const { newLink, openModalEdit, openModalRemove, setOpenModalEdit, setOpenModalRemove, handSubmitEdit, handSubmitRemove, randomString } =
        useShortLinkStore();

    const {
        auth: { user },
        links = [],
        baseUrl = '',
    } = usePage<SharedData & { links: any[]; baseUrl: string }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Links" />
            <ModalAction open={openModalEdit}>
                <h2 className="mb-2 text-lg font-semibold">Edit Link</h2>
                <form onSubmit={handSubmitEdit}>
                    <div className="mb-4 flex items-center justify-between gap-2">
                        <span className="text-gray-600">{newLink ? `${baseUrl}/s/${newLink}` : 'Not new link generated'}</span>
                        <button
                            type="button"
                            className="cursor-pointer rounded bg-gray-300 px-4 py-2 text-black"
                            onClick={() => randomString()}
                        >
                            Random
                        </button>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button type="submit" className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenModalEdit(false)}
                            className="ml-2 cursor-pointer rounded bg-gray-300 px-4 py-2 text-black"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </ModalAction>
            <ModalAction open={openModalRemove}>
                <h2 className="mb-2 text-lg font-semibold">Remove Link</h2>
                <form onSubmit={handSubmitRemove}>
                    <div className="mt-4 flex justify-center">
                        <button type="submit" className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white">
                            Confirm Remove
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenModalRemove(false)}
                            className="ml-2 cursor-pointer rounded bg-gray-300 px-4 py-2 text-black"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </ModalAction>
            <div className="mb-6 flex w-full max-w-4xl items-center justify-between">
                <h1 className="text-2xl font-semibold">My Links</h1>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hello, {user?.name}</div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/70 text-center dark:bg-black/70">
                            <h3 className="font-semibold">My Links</h3>
                        </div>
                    </div>
                </div>
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                #
                            </th>
                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Original URL
                            </th>
                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Short URL
                            </th>
                            {
                                user?.role === 'admin' && (
                                    <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        User
                                    </th>
                                )
                            }
                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Clicks
                            </th>
                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Created At
                            </th>
                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Expires At
                            </th>
                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Status
                            </th>
                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map((link, i) => (
                            <tr key={link.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                <td className="border-b border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    {i + 1}
                                </td>
                                <td className="border-b border-gray-200 px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    {link.full}
                                </td>
                                <td className="border-b border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-blue-600 dark:text-blue-400">
                                    <a
                                        className="cursor-pointer text-blue-600 hover:underline"
                                        href={`${baseUrl}/s/${link.short}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {`${baseUrl}/s/${link.short}`}
                                    </a>
                                </td>
                                {
                                    user?.role === 'admin' && (
                                        <td className="border-b border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                                            {link.user?.name}
                                        </td>
                                    )
                                }
                                <td className="border-b border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    {link.clicks_count}
                                </td>
                                <td className="border-b border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    {link.created_at ? new Date(link.created_at).toLocaleString() : ''}
                                </td>
                                <td className="border-b border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    {link.expires_at ? new Date(link.expires_at).toLocaleString() : ''}
                                </td>
                                <td className="border-b border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    {link.expires_at && link.expires_at < new Date() ? 'Expired' : 'Active'}
                                </td>
                                <td className="border-b border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
                                    <button
                                        className="mr-2 cursor-pointer text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200"
                                        onClick={() => setOpenModalEdit(true, Number(link.id))}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="cursor-pointer text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
                                        onClick={() => setOpenModalRemove(true, Number(link.id))}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
