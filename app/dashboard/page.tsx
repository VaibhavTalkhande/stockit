'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { FaBox, FaUsers, FaShoppingCart, FaChartLine } from 'react-icons/fa';

const DashboardPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [user, router]);

    if (loading) {
        return <div className="min-h-screen bg-[#FFE5D4] flex items-center justify-center">
            <div className="text-2xl font-bold text-[#2A2A2A]">Loading...</div>
        </div>;
    }

    if (!user) {
        return null;
    }

    const stats = [
        {
            title: 'Total Products',
            value: '1,234',
            icon: <FaBox className="text-3xl" />,
            color: 'bg-[#FF6B6B]',
        },
        {
            title: 'Total Customers',
            value: '567',
            icon: <FaUsers className="text-3xl" />,
            color: 'bg-[#4ECDC4]',
        },
        {
            title: 'Total Orders',
            value: '890',
            icon: <FaShoppingCart className="text-3xl" />,
            color: 'bg-[#FFE66D]',
        },
        {
            title: 'Revenue',
            value: '$12,345',
            icon: <FaChartLine className="text-3xl" />,
            color: 'bg-[#95E1D3]',
        },
    ];

    return (
        <div className="min-h-screen  block top-0 scroll-y bg-[#FFE5D4] p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 bg-white p-6 rounded-lg border-4 border-[#2A2A2A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-4xl font-black text-[#2A2A2A]">{user.storeName}</h1>
                    <p className="text-xl text-[#2A2A2A] mt-2">Welcome back, {user.username}!</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border-4 border-[#2A2A2A] p-6 flex items-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            <div className={`${stat.color} p-3 rounded-lg text-white mr-4 border-2 border-[#2A2A2A]`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-[#2A2A2A] text-sm font-bold">{stat.title}</p>
                                <p className="text-2xl font-black text-[#2A2A2A]">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-lg border-4 border-[#2A2A2A] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-[#2A2A2A] mb-4">Recent Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-4 border-[#2A2A2A]">
                                        <th className="text-left py-3 font-black text-[#2A2A2A]">Order ID</th>
                                        <th className="text-left py-3 font-black text-[#2A2A2A]">Customer</th>
                                        <th className="text-left py-3 font-black text-[#2A2A2A]">Amount</th>
                                        <th className="text-left py-3 font-black text-[#2A2A2A]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5].map((order) => (
                                        <tr key={order} className="border-b-2 border-[#2A2A2A]">
                                            <td className="py-3 font-bold text-[#2A2A2A]">#ORD-{order}</td>
                                            <td className="py-3 font-bold text-[#2A2A2A]">Customer {order}</td>
                                            <td className="py-3 font-bold text-[#2A2A2A]">${(100 + order * 20).toFixed(2)}</td>
                                            <td className="py-3">
                                                <span className="px-3 py-1 bg-[#4ECDC4] text-[#2A2A2A] rounded-lg text-sm font-bold border-2 border-[#2A2A2A]">
                                                    Completed
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg border-4 border-[#2A2A2A] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-[#2A2A2A] mb-4">Quick Actions</h2>
                        <div className="space-y-4">
                            <button 
                                className="w-full bg-[#FF6B6B] text-[#2A2A2A] py-3 px-4 rounded-lg border-4 border-[#2A2A2A] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                onClick={() => router.push('/dashboard/addProduct')}
                            >
                                Add New Product
                            </button>
                            <button 
                                className="w-full bg-[#4ECDC4] text-[#2A2A2A] py-3 px-4 rounded-lg border-4 border-[#2A2A2A] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                onClick={() => router.push('/dashboard/createorder')}
                            >
                                Create New Order
                            </button>
                            <button 
                                className="w-full bg-[#FFE66D] text-[#2A2A2A] py-3 px-4 rounded-lg border-4 border-[#2A2A2A] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                onClick={() => router.push('/dashboard/inventory')}
                            >
                                Inventory Management
                            </button>
                            <button 
                                className="w-full bg-[#95E1D3] text-[#2A2A2A] py-3 px-4 rounded-lg border-4 border-[#2A2A2A] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
