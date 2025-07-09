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
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isActive = (path: string) => pathname === path;
    
    return (
        <nav className="fixed mb-5 block w-full z-30 bg-white border-b-4 border-[#2A2A2A] shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-full mx-auto">
                <div className="flex justify-between items-center h-16 px-4">
                    <Link 
                        href="/" 
                        className="text-2xl font-black text-[#2A2A2A] hover:scale-105 transition-transform"
                    >
                        StockIt
                    </Link>
                    <div className="flex items-center gap-3">
                        {isClient && user ? (
                            <div className="flex items-center gap-3">
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`flex items-center gap-2 px-4 py-2 bg-[#4ECDC4] rounded-lg border-4 border-[#2A2A2A] font-bold text-[#2A2A2A] transition-all ${
                                            isDropdownOpen 
                                                ? 'translate-x-1 translate-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                                                : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                        }`}
                                    >
                                        <span>{user.username}</span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border-4 border-[#2A2A2A] rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                            <Link 
                                                href="/dashboard"
                                                className={`block px-4 py-2 text-[#2A2A2A] font-bold hover:bg-[#FFE5D4] transition-all border-b-2 border-[#2A2A2A] ${
                                                    isActive('/dashboard') ? 'bg-[#FFE5D4]' : ''
                                                }`}
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link 
                                                href="/profile"
                                                className={`block px-4 py-2 text-[#2A2A2A] font-bold hover:bg-[#FFE5D4] transition-all border-b-2 border-[#2A2A2A] ${
                                                    isActive('/profile') ? 'bg-[#FFE5D4]' : ''
                                                }`}
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <button 
                                                onClick={async() => {
                                                    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`, {
                                                        method: 'POST', // or 'GET', depending on your backend
                                                        credentials: 'include',
                                                    });
                                                    dispatch(logout());
                                                    setIsDropdownOpen(false);
                                                    router.push('/login');
                                                }}
                                                className="w-full text-left px-4 py-2 text-[#2A2A2A] font-bold hover:bg-[#FF6B6B] hover:text-white transition-all"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link 
                                    href="/login"
                                    className={`px-4 py-2 rounded-lg border-4 border-[#2A2A2A] font-bold text-[#2A2A2A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                                        isActive('/login') ? 'bg-[#4ECDC4]' : 'bg-white'
                                    }`}
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register"
                                    className={`px-4 py-2 rounded-lg border-4 border-[#2A2A2A] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                                        isActive('/register') ? 'bg-[#4ECDC4] text-[#2A2A2A]' : 'bg-[#2A2A2A] text-white'
                                    }`}
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
