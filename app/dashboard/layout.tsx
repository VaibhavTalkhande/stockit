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
    <div className="min-h-screen bg-[#FFE5D4]">
      <Navbar />
      <div className="flex pt-16">
        <SideNavbar />
        <div className="flex-1 ml-64 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;