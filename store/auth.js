import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    setToken: (token) => {
        set({ token });
        localStorage.setItem('token', token);
    },
    logout: () => {
        set({ token: null });
        localStorage.removeItem('token');
    },
}));