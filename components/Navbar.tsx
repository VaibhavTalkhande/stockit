'use client';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { logout } from '../store/slices/authSlice';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);




    const isActive = (path: string) => pathname === path;
    
    return (
        <nav className="fixed w-screen sm:px-2 z-30 bg-white border-b border-gray-200 shadow-sm">
            <div className="w-full mx-auto">
                <div className="flex justify-between items-center h-14 px-4">
                    <Link 
                        href="/" 
                        className="text-xl font-bold text-gray-900 hover:opacity-80 transition"
                    >
                        StockIt
                    </Link>
                    <div className="flex items-center gap-2">
                        {isClient && user ? (
                            <div className="flex items-center gap-2">
                                <div className="relative" >
                                    <div
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center gap-1 px-2 py-1 cursor-pointer select-none text-gray-900 font-semibold hover:bg-gray-50 rounded-md transition group"
                                    >
                                        <span className="group-hover:text-blue-600 transition">{user?.username}</span>
                                        <svg 
                                            className={`w-4 h-4 ml-1 text-gray-500 group-hover:text-blue-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                                            <Link 
                                                href="/dashboard"
                                                className={`block px-4 py-2 text-gray-900 hover:bg-gray-100 transition ${isActive('/dashboard') ? 'bg-gray-100' : ''}`}
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link 
                                                href="/profile"
                                                className={`block px-4 py-2 text-gray-900 hover:bg-gray-100 transition ${isActive('/profile') ? 'bg-gray-100' : ''}`}
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <button 
                                                onClick={async() => {
                                                    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`, {
                                                        method: 'POST',
                                                        credentials: 'include',
                                                    });
                                                    dispatch(logout());
                                                    setIsDropdownOpen(false);
                                                    router.push('/login');
                                                }}
                                                className="w-full text-left px-4 py-2 text-gray-900 hover:bg-red-100 hover:text-red-600 transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link 
                                    href="/login"
                                    className={`px-3 py-1 rounded-md border border-gray-300 font-medium text-gray-900 bg-white hover:bg-gray-100 transition ${isActive('/login') ? 'bg-gray-100' : ''}`}
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register"
                                    className={`px-3 py-1 rounded-md border border-gray-900 font-medium text-white bg-gray-900 hover:bg-gray-800 transition ${isActive('/register') ? 'bg-gray-800' : ''}`}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
