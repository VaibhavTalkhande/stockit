'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setCredentials({user: data.user}));
                console.log('User data:', data);
                alert('Logged in successfully');
                router.push('/'); // Redirect to home page after successful login
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 p-6 w-11/12 max-w-md mx-auto mt-10 bg-blue-500 text-black border-4 border-black shadow-lg rounded-lg sm:p-8 sm:gap-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center bg-white p-2 border-2 border-black rounded">Login</h2>
            <label className="text-black font-bold" htmlFor="email">Email</label>
            <input 
            id="email"
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="p-3 bg-white border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black sm:p-4"
            />
            <label className="text-black font-bold" htmlFor="password">Password</label>
            <input 
            id="password"
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="p-3 bg-white border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black sm:p-4"
            />
            <button 
            type="submit" 
            className="p-3 bg-black text-white font-bold border-2 border-black rounded hover:bg-white hover:text-black transition-all sm:p-4"
            >
            Login
            </button>
        </form>
    );
};

export default LoginPage;
