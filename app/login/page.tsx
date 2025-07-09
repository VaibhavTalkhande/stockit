'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
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
                dispatch(setCredentials({ user: data.data.user }));
                alert('Logged in successfully');
                router.push('/'); // Redirect to home page after successful login
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch (err) {
            setError('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-8 px-2">
            <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full max-w-md bg-white border-4 border-black shadow-xl rounded-2xl p-8 sm:p-10 min-h-[420px] sm:min-h-[480px] justify-center">
                <h2 className="text-3xl font-extrabold text-center mb-2 bg-blue-500 text-white p-2 rounded border-2 border-black">Login</h2>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-bold text-black">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 bg-white border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-bold text-black">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 bg-white border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                </div>
                {error && <span className="text-red-500 text-sm text-center">{error}</span>}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 p-3 bg-black text-white font-bold border-2 border-black rounded hover:bg-white hover:text-black transition-all text-lg disabled:opacity-60"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
