'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // This effect will run on mount and when the user state changes
        if (user === null) {
            // If we're not on the login or register page, redirect to login
            const currentPath = window.location.pathname;
            if (!currentPath.startsWith('/login') && !currentPath.startsWith('/register')) {
                router.push('/login');
            }
        }
    }, [user, router]);

    return <>{children}</>;
};

export default AuthProvider; 