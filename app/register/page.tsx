'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', storeName: '' });
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({ name: '', email: '', password: '', storeName: '' });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = { name: '', email: '', password: '', storeName: '' };
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';
        if (!form.storeName) newErrors.storeName = 'Store Name is required';

        if (Object.values(newErrors).some((error) => error)) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(setCredentials(data));
                alert('Registration successful!');
            } else {
                alert(data.message || 'Registration failed.');
            }
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-8 px-2">
            <form onSubmit={handleRegister} className="mt-24 flex flex-col gap-5 w-full max-w-md bg-white border-4 border-black shadow-xl rounded-2xl p-6 sm:p-10 min-h-[420px] sm:min-h-[480px] justify-center">
                <h2 className="text-3xl font-extrabold text-center mb-2 bg-blue-500 text-white p-2 rounded border-2 border-black">Register</h2>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-bold text-black">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="p-3 bg-white border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-bold text-black">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="p-3 bg-white border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="storeName" className="font-bold text-black">Store Name</label>
                    <input
                        id="storeName"
                        type="text"
                        placeholder="Store Name"
                        value={form.storeName}
                        onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                        className="p-3 bg-white border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                    {errors.storeName && <span className="text-red-500 text-sm">{errors.storeName}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-bold text-black">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="p-3 bg-white border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>
                <button
                    type="submit"
                    className="mt-2 p-3 bg-black text-white font-bold border-2 border-black rounded hover:bg-white hover:text-black transition-all text-lg"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
