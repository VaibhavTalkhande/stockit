"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const {user} = useSelector((state: any) => state.auth); // Adjust the type according to your store structure
     // Destructure user properties
    const [form, setForm] = useState({
        username: user.username || '',
        email: user.email || '',
        storeName: user.store.name || ''
    });
    const [loading, setLoading] = useState(false);

    if (!user) {
        redirect('/login')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update-profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({...form})
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Profile updated successfully!');
            } else {
                toast.error(data.message || 'Failed to update profile.');
            }
        } catch (err) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-2 py-20 sm:pt-24 md:pt-28 lg:pt-32">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white border border-gray-200 shadow-lg rounded-xl p-4 sm:p-8 mx-auto">
                <div className="flex flex-col items-center mb-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-gray-500">U</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Update Profile</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="font-medium text-gray-700">Name</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your name"
                        value={form.username}
                        onChange={handleChange}
                        className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="storeName" className="font-medium text-gray-700">Store Name</label>
                    <input
                        id="storeName"
                        name="storeName"
                        type="text"
                        placeholder="Enter your store name"
                        value={form.storeName}
                        onChange={handleChange}
                        className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all text-lg disabled:opacity-60"
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
}

export default ProfilePage;