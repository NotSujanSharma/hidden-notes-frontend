import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store/auth';

export default function Logout() {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        logout();
        router.push('/');
    }, [logout, router]);

    return null;
}