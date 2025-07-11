'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { RootState } from '../../store/index';

const LoginPage = () => {
    const {user} = useSelector((state: RootState) => state.auth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setCredentials({ user: data.user }));
                toast.success('Logged in successfully');
                router.push('/'); // Redirect to home page after successful login
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user) {
          router.push('/');
        }
      }, [user, router]);
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-2 py-20 sm:pt-24 md:pt-28 lg:pt-32">
            <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white border border-gray-200 shadow-lg rounded-xl p-4 sm:p-8 mx-auto">
                {/* Logo or App Name */}
                <div className="flex flex-col items-center mb-2">
                    {/* Replace with your logo if available */}
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-gray-500">S</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Sign in to Stockit</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base sm:text-base"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base sm:text-base"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                </div>
                {error && <span className="text-red-500 text-sm text-center">{error}</span>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all text-lg disabled:opacity-60"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="text-center text-sm text-gray-600 mt-2">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
