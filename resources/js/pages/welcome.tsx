import Modal from '@/components/modal';
import { dashboard, login, logout, register } from '@/routes';
import { useShortLinkStore } from '@/store/useShortLinkStore';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const { url, shortLink, loading, openModal, isCopied, setUrl, setOpenModal, setIsCopied, handleSubmit } = useShortLinkStore();

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <h2 className="mb-2 text-lg font-semibold">Your Short Link</h2>
                {shortLink && (
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            readOnly
                            value={shortLink}
                            className="flex-1 rounded border px-2 py-1 text-sm dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(shortLink);
                                setIsCopied(true);
                            }}
                            className="cursor-pointer rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                )}
            </Modal>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-2">
                                <span className="mr-4 text-white text-lg">Hello, {auth.user.name}</span>
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={logout()}
                                    method="post"
                                    as="button"
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] cursor-pointer"
                                >
                                    Log out
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h3 className="mb-6 text-center text-2xl leading-snug font-semibold lg:mb-12 lg:text-3xl">Generate your short link</h3>
                            {auth.user ? (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-row">
                                    <input
                                        type="url"
                                        name="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="Enter your URL here"
                                        required
                                        className="flex-1 rounded-sm border border-[#19140035] bg-transparent px-4 py-2 text-sm leading-normal text-[#1b1b18] placeholder:text-[#191400a1] focus:border-[#1915014a] focus:outline-none dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:placeholder:text-[#62605b] dark:focus:border-[#62605b]"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="cursor-pointer rounded-sm bg-[#1b1b18] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a3a36] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#C6C6C4]"
                                    >
                                        {loading ? 'Processing...' : 'Shorten'}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center">
                                    <p>Please login to generate a short link.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
