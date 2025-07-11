'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', storeName: '' });
    const dispatch = useDispatch();
    const router = useRouter();
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(setCredentials(data));
                toast.success('Registration successful!');
                setTimeout(()=>router.push('/login'),1500)
            } else {
                toast.error(data.message || 'Registration failed.');
            }
        } catch (err) {
            toast.error('Something went wrong!');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-2 py-20 sm:pt-24 md:pt-28 lg:pt-32">
            <form onSubmit={handleRegister} className="flex flex-col gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white border border-gray-200 shadow-lg rounded-xl p-4 sm:p-8 mx-auto">
                {/* Logo or App Name */}
                <div className="flex flex-col items-center mb-2">
                    {/* Replace with your logo if available */}
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-gray-500">S</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Create your account</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base sm:text-base"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base sm:text-base"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="storeName" className="font-medium text-gray-700">Store Name</label>
                    <input
                        id="storeName"
                        type="text"
                        placeholder="Enter your store name"
                        value={form.storeName}
                        onChange={(e) => setForm({ ...form, storeName: e.target.value })}
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
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base sm:text-base"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-2 p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all text-lg"
                >
                    Register
                </button>
                <div className="text-center text-sm text-gray-600 mt-2">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
