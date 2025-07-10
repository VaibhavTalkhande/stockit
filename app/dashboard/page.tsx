'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { FaBox, FaUsers, FaShoppingCart, FaChartLine, FaPlus, FaClipboardList, FaWarehouse, FaChartBar } from 'react-icons/fa';
import axios from 'axios';

interface OrderDetails {
    paymentStatus: 'pending' | 'paid' | 'failed';
    _id: string;
    storeName: string;
    customer: {
      _id: string;
      name: string;
      email: string;
    };
    products: {
      productId: string
      name:string;
      quantity: number;
      price: number;
      _id: string;
    }[];
    totalAmount: number;
    date: string; 
    createdAt: string;
    updatedAt: string;
}

const DashboardPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [orders,setOrders]= useState<OrderDetails[]>([])
    const [totalOrders,setTotalOrders]= useState<number>(0);
    const [totalCustomers,setTotalCustomers] = useState<number>(0);
    const [totalRevenue,setTotalRevenue] = useState<number>(0);
    const [totalProducts,setTotalProducts] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [user, router]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const salesResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sales/getsales`, {
              withCredentials: true,
            });
            setOrders(salesResponse.data);

            const productResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/total-products`, {
                withCredentials: true,
              });
            setTotalProducts(productResponse.data)
          } catch (error) {
            console.error(error);
            setOrders([]);
          }
        };
        fetchData();
    },[]);
    useEffect(()=>{
        setTotalRevenue(revenueCalculate)
        setTotalOrders(ordersCalculate)
        setTotalCustomers(customersCalculate)
    },[orders])
    
    const sortedOrders = orders.sort((a,b)=>{
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    
    const revenueCalculate = () => {
        const revenue = orders.reduce((acc, order) => acc + Number(order.totalAmount), 0)
        return revenue;
    }

    const ordersCalculate = () => {
        let revenue = 0;
        orders.forEach(order=>{
            revenue+=1;
        })
        return revenue;
    }

    const customersCalculate = ()=>{
        const customerTotals:string[] =[];
        orders.forEach(order=>{
            if(!customerTotals.includes(order.customer.email)){
                customerTotals.push(order.customer.email)
            }
        })
        return customerTotals.length;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#FFE5D4] to-[#FFD6BA] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#2A2A2A] mx-auto mb-4"></div>
                    <div className="text-2xl font-bold text-[#2A2A2A]">Loading Dashboard...</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const stats = [
        {
            title: 'Total Products',
            value: totalProducts,
            icon: <FaBox className="text-xl sm:text-2xl md:text-3xl" />,
            color: 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E]',
            bgColor: 'bg-red-50',
        },
        {
            title: 'Total Customers',
            value: totalCustomers,
            icon: <FaUsers className="text-xl sm:text-2xl md:text-3xl" />,
            color: 'bg-gradient-to-br from-[#4ECDC4] to-[#6EDDD6]',
            bgColor: 'bg-cyan-50',
        },
        {
            title: 'Total Orders',
            value: `${totalOrders}`,
            icon: <FaShoppingCart className="text-xl sm:text-2xl md:text-3xl" />,
            color: 'bg-gradient-to-br from-[#FFE66D] to-[#FFF07C]',
            bgColor: 'bg-yellow-50',
        },
        {
            title: 'Revenue',
            value: `$${totalRevenue.toFixed(2)}`,
            icon: <FaChartLine className="text-xl sm:text-2xl md:text-3xl" />,
            color: 'bg-gradient-to-br from-[#95E1D3] to-[#A7E8DB]',
            bgColor: 'bg-green-50',
        },
    ];

    const quickActions = [
        {
            title: 'Add New Product',
            icon: <FaPlus className="text-base sm:text-xl" />,
            color: 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E]',
            onClick: () => router.push('/dashboard/addProduct'),
        },
        {
            title: 'Create New Order',
            icon: <FaClipboardList className="text-base sm:text-xl" />,
            color: 'bg-gradient-to-br from-[#4ECDC4] to-[#6EDDD6]',
            onClick: () => router.push('/dashboard/createorder'),
        },
        {
            title: 'Inventory Management',
            icon: <FaWarehouse className="text-base sm:text-xl" />,
            color: 'bg-gradient-to-br from-[#FFE66D] to-[#FFF07C]',
            onClick: () => router.push('/dashboard/inventory'),
        },
        {
            title: 'View Analytics',
            icon: <FaChartBar className="text-base sm:text-xl" />,
            color: 'bg-gradient-to-br from-[#95E1D3] to-[#A7E8DB]',
            onClick: () => router.push('/dashboard/analytics'),
        },
    ];

    return (
        <div className="relative min-h-screen max-w-screen overflow-x-hidden bg-gradient-to-br from-[#FFE5D4] to-[#FFD6BA] p-2 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Header */}
                <div className="bg-white rounded-2xl border-4 border-[#2A2A2A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#2A2A2A] mb-1 sm:mb-2">
                                {user.store.name}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-[#2A2A2A] opacity-80">
                                Welcome back, {user.username}! 👋
                            </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                            <div className="text-xs sm:text-sm text-[#2A2A2A] opacity-60">
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border-4 border-[#2A2A2A] p-3 sm:p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group"
                        >
                            <div className="flex items-center">
                                <div className={`${stat.color} p-2 sm:p-3 md:p-4 rounded-xl text-white mr-2 sm:mr-4 border-2 border-[#2A2A2A] group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#2A2A2A] text-xs sm:text-sm font-bold opacity-80">{stat.title}</p>
                                    <p className="text-lg sm:text-xl md:text-2xl font-black text-[#2A2A2A]">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {/* Recent Orders */}
                    <div className="order-2 lg:order-1 lg:col-span-2 bg-white rounded-2xl border-4 border-[#2A2A2A] p-3 sm:p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#2A2A2A]">Recent Orders</h2>
                            <button 
                                onClick={() => router.push('/dashboard/orders')}
                                className="text-xs sm:text-sm bg-[#2A2A2A] text-white px-2 sm:px-3 py-1 rounded-lg border-2 border-[#2A2A2A] font-bold hover:bg-[#4ECDC4] hover:text-[#2A2A2A] transition-all"
                            >
                                View All
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs sm:text-sm">
                                <thead>
                                    <tr className="border-b-4 border-[#2A2A2A]">
                                        <th className="text-left py-2 px-1 sm:py-3 sm:px-2 md:px-4 font-black text-[#2A2A2A]">Order ID</th>
                                        <th className="text-left py-2 px-1 sm:py-3 sm:px-2 md:px-4 font-black text-[#2A2A2A]">Customer</th>
                                        <th className="text-left py-2 px-1 sm:py-3 sm:px-2 md:px-4 font-black text-[#2A2A2A]">Amount</th>
                                        <th className="text-left py-2 px-1 sm:py-3 sm:px-2 md:px-4 font-black text-[#2A2A2A]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && sortedOrders.slice(0, 5).map((order) => (
                                        <tr key={order._id} className="border-b-2 border-[#2A2A2A] hover:bg-gray-50 transition-colors">
                                            <td className="py-2 px-1 sm:py-3 sm:px-2 md:px-4 font-bold text-[#2A2A2A]">
                                                {order._id.slice(-6).toUpperCase()}
                                            </td>
                                            <td className="py-2 px-1 sm:py-3 sm:px-2 md:px-4 font-bold text-[#2A2A2A]">
                                                {order.customer.name}
                                            </td>
                                            <td className="py-2 px-1 sm:py-3 sm:px-2 md:px-4 font-bold text-[#2A2A2A]">
                                                ${order.totalAmount.toFixed(2)}
                                            </td>
                                            <td className="py-2 px-1 sm:py-3 sm:px-2 md:px-4">
                                                <span className={`px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-lg text-xs md:text-sm font-bold border-2 border-[#2A2A2A] ${
                                                    order.paymentStatus === 'paid' 
                                                        ? 'bg-[#4ECDC4] text-[#2A2A2A]' 
                                                        : order.paymentStatus === 'pending'
                                                        ? 'bg-[#FFE66D] text-[#2A2A2A]'
                                                        : 'bg-[#FF6B6B] text-[#2A2A2A]'
                                                }`}>
                                                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!orders || orders.length === 0) && (
                                        <tr>
                                            <td colSpan={4} className="py-6 sm:py-8 text-center text-[#2A2A2A] font-bold">
                                                No orders found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="order-1 lg:order-2 mb-4 lg:mb-0 bg-white rounded-2xl border-4 border-[#2A2A2A] p-3 sm:p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#2A2A2A] mb-4 sm:mb-6">Quick Actions</h2>
                        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                            {quickActions.map((action, index) => (
                                <button 
                                    key={index}
                                    className="w-full bg-white text-[#2A2A2A] py-2 sm:py-3 md:py-4 px-2 sm:px-4 rounded-xl border-4 border-[#2A2A2A] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group"
                                    onClick={action.onClick}
                                >
                                    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                                        <div className={`${action.color} p-1.5 sm:p-2 rounded-lg text-white border-2 border-[#2A2A2A] group-hover:scale-110 transition-transform duration-300`}>
                                            {action.icon}
                                        </div>
                                        <span className="text-xs sm:text-sm md:text-base">{action.title}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
