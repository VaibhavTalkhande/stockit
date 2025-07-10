"use client";
import { RootState } from "@/store/index";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideNavbar from '@/components/SideNavbar';
import Navbar from '@/components/Navbar';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-[#FFE5D4] w-full">
      <SideNavbar />
      <main className="z-0 pt-14 md:ml-56 min-h-screen max-w-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;