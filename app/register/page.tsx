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
        <form onSubmit={handleRegister} className="flex flex-col gap-4 p-4 w-1/2 mx-auto mt-10 bg-white shadow-md rounded-lg">
            <input type="text" placeholder="Name" value={form.name}
                   onChange={(e) => setForm({ ...form, name: e.target.value })} />
            {errors.name && <span className="text-red-500">{errors.name}</span>}

            <input type="email" placeholder="Email" value={form.email}
                   onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <span className="text-red-500">{errors.email}</span>}

            <input type="text" placeholder="Store Name" value={form.storeName}
                   onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
            {errors.storeName && <span className="text-red-500">{errors.storeName}</span>}

            <input type="password" placeholder="Password" value={form.password}
                   onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {errors.password && <span className="text-red-500">{errors.password}</span>}

            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterPage;
