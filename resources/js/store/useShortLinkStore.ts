import axios from 'axios';
import { create } from 'zustand';

type ShortLinkState = {
    url: string;
    shortLink: string | null;
    loading: boolean;
    openModal: boolean;
    openModalEdit: boolean;
    openModalRemove: boolean;
    isCopied: boolean;
    linkId?: number;
    newLink?: string;
    setUrl: (url: string) => void;
    setOpenModal: (open: boolean) => void;
    setOpenModalEdit: (open: boolean, linkId?: number) => void;
    setOpenModalRemove: (open: boolean, linkId?: number) => void;
    setIsCopied: (copied: boolean) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handSubmitEdit?: (e: React.FormEvent) => Promise<void>;
    handSubmitRemove?: (e: React.FormEvent) => Promise<void>;
    randomString: (length?: number) => Promise<void>;
};

export const useShortLinkStore = create<ShortLinkState>((set, get) => ({
    url: '',
    shortLink: null,
    loading: false,
    openModal: false,
    openModalEdit: false,
    openModalRemove: false,
    isCopied: false,
    linkId: undefined,
    newLink: '',

    setUrl: (url) => set({ url }),
    setOpenModal: (open) => set({ openModal: open }),
    setOpenModalEdit: (open, linkId) => set({ openModalEdit: open, linkId, newLink: '' }),
    setOpenModalRemove: (open, linkId) => set({ openModalRemove: open, linkId, newLink: '' }),
    setIsCopied: (copied) => set({ isCopied: copied }),

    handleSubmit: async (e) => {
        e.preventDefault();
        const { url } = get();
        set({ loading: true });
        try {
            const response = await axios.post('/short-links', { url });
            set({
                shortLink: response.data.short_link,
                openModal: true,
                isCopied: false,
                url: '',
            });
        } catch (error) {
            console.error(error);
            alert('สร้าง short link ไม่สำเร็จ');
        } finally {
            set({ loading: false });
        }
    },

    handSubmitEdit: async (e) => {
        e.preventDefault();
        const { linkId, newLink } = get();
        set({ loading: true });
        try {
            await axios.put(`/short-links/${linkId}`, { short_link: newLink });
            set({ openModalEdit: false, newLink: '', linkId: undefined });
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Failed to edit short link');
        } finally {
            set({ loading: false });
        }
    },

    handSubmitRemove: async (e) => {
        e.preventDefault();
        const { linkId } = get();
        set({ loading: true });
        try {
            await axios.delete(`/short-links/${linkId}`);
            set({ openModalRemove: false, linkId: undefined });
        } catch (error) {
            console.error(error);
            alert('Failed to remove short link');
        } finally {
            set({ loading: false });
        }
        window.location.reload();
    },

    randomString: async (length = 6) => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        set({ newLink: result });
    },
}));
