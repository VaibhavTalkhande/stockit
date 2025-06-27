'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBox, FaUsers, FaShoppingCart, FaChartLine, FaHome, FaCog } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';

const SideNavbar = () => {
    const pathname = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
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
        {
            name: 'Settings',
            path: '/dashboard/settings',
            icon: <FaCog className="text-xl" />
        }
    ];
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <div className="fixed left-0 top-16 mt-1 h-[calc(100vh-4rem)] w-64 bg-white border-r-4 border-[#2A2A2A] shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] z-20">

            {/* Navigation Links */}
            <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 p-3 rounded-lg border-4 border-[#2A2A2A] font-bold transition-all ${
                                isActive
                                    ? 'bg-[#4ECDC4] text-[#2A2A2A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                    : 'bg-white text-[#2A2A2A] hover:bg-[#FFE5D4] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                            }`}
                        >
                            <div className={`${isActive ? 'text-[#2A2A2A]' : 'text-[#2A2A2A]'}`}>
                                {item.icon}
                            </div>
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t-4 border-[#2A2A2A]">
                <div className="flex items-center gap-3 p-3 rounded-lg border-4 border-[#2A2A2A] bg-[#FFE5D4]">
                    <div className="w-10 h-10 rounded-full bg-[#FF6B6B] border-2 border-[#2A2A2A] flex items-center justify-center font-bold text-[#2A2A2A]">
                        {isClient && user?.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-[#2A2A2A]">
                            {isClient && user?.username}
                        </p>
                        <p className="text-sm text-[#2A2A2A]">
                            {isClient && user?.storeName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideNavbar;
