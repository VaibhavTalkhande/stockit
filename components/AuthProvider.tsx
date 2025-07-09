import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user === null) {
            const currentPath = window.location.pathname;
            if (!currentPath.startsWith('/login') && !currentPath.startsWith('/register')) {
                router.push('/login');
            }
        }
    }, [user, loading, router]);

    if (loading) {
        // Optionally show a loading spinner here
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AuthProvider;