'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBox, FaUsers, FaShoppingCart, FaChartLine, FaHome, FaCog, FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { logout } from '../store/slices/authSlice';
import axios from 'axios';

const SideNavbar = () => {
    const pathname = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const [openSide, setOpenSide] = useState(false);
    const [openDropdown,setOpenDropDown] = useState(false); 
    const router = useRouter()
    const dispatch = useDispatch();
    const navItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: <FaHome className="text-xl" />
        },
        {
            name: 'Products',
            path: '/dashboard/products',
            icon: <FaBox className="text-xl" />
        },
        {
            name: 'Orders',
            path: '/dashboard/orders',
            icon: <FaShoppingCart className="text-xl" />
        },
        {
            name: 'Customers',
            path: '/dashboard/customers',
            icon: <FaUsers className="text-xl" />
        },
        {
            name: 'Analytics',
            path: '/dashboard/analytics',
            icon: <FaChartLine className="text-xl" />
        },
    ];
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogout =async() => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`,
            {withCredentials: true,}
        );
        dispatch(logout());
        setOpenDropDown(false);
        router.push('/login');
    }
    return (
        <>
            {/* Mobile Top Bar */}
            <div className="md:hidden fixed top-0 left-0 w-screen bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4 h-14 shadow-sm">
                <button onClick={() => setOpenSide((prev)=>!prev)} className="p-2 focus:outline-none w-10">
                    <FaBars className="text-2xl text-gray-900" />
                </button>
                <span className="font-bold text-gray-900 text-lg">{isClient && user?.store?.name}</span>
                <div className="relative">
                    <button
                        onClick={() => setOpenDropDown((prev) => !prev)}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700 focus:outline-none"
                        aria-label="User menu"
                    >
                        {isClient && user?.username.charAt(0).toUpperCase()}
                    </button>
                    {openDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50">
                            <Link
                                href="/profile"
                                className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition"
                                onClick={() => setOpenDropDown(false)}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-gray-900 hover:bg-red-100 hover:text-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`md:hidden fixed  left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-200 ${openSide ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200">
                        <span className="font-bold text-gray-900 text-lg">StockIt</span>
                        <button onClick={() => setOpenSide(false)} className="p-2 focus:outline-none">✕</button>
                    </div>
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-3 p-2 rounded-md font-medium transition-colors ${
                                        isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setOpenSide(false)}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-56 bg-white border-r border-gray-200 z-20">
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 p-2 rounded-md font-medium transition-colors ${
                                    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                            {isClient && user?.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">{isClient && user?.username}</p>
                            <p className="text-sm text-gray-500">{isClient && user?.store?.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideNavbar;


