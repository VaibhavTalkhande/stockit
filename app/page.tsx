'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBoxOpen, FaFileInvoiceDollar, FaUsers, FaChartLine, FaLock,FaUser } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Hero Section */}
      <header className="min-h-screen bg-[#1E3A8A] text-white flex items-center pt-20 pb-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 w-full">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight drop-shadow-lg">Stock It</h1>
              <p className="text-lg sm:text-2xl md:text-3xl mb-8 sm:mb-12 leading-relaxed opacity-90">The all-in-one platform to manage inventory, sales, and customers for modern businesses.</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
                <Link href="/register">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#1E3A8A] rounded-lg shadow-lg border-2 border-black hover:bg-blue-100 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-lg font-bold">
                    Get Started
                  </button>
                </Link>
                <a href="#features" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white rounded-lg shadow-lg border-2 border-white hover:bg-white hover:text-[#1E3A8A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-lg font-bold">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl border-2 border-black w-full max-w-md md:max-w-lg lg:max-w-xl">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-[#1E3A8A] text-white p-4 sm:p-6 rounded-lg flex flex-col items-center shadow-md hover:scale-105 hover:shadow-xl transition-all">
                    <span className="mb-2 text-2xl sm:text-3xl"><FaBoxOpen /></span>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Inventory Items</h3>
                    <p className="text-2xl sm:text-3xl font-bold">1,234</p>
                  </div>
                  <div className="bg-[#1E3A8A] text-white p-4 sm:p-6 rounded-lg flex flex-col items-center shadow-md hover:scale-105 hover:shadow-xl transition-all">
                    <span className="mb-2 text-2xl sm:text-3xl"><FaFileInvoiceDollar /></span>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Sales</h3>
                    <p className="text-2xl sm:text-3xl font-bold">$5,678</p>
                  </div>
                  <div className="bg-[#1E3A8A] text-white p-4 sm:p-6 rounded-lg flex flex-col items-center shadow-md hover:scale-105 hover:shadow-xl transition-all">
                    <span className="mb-2 text-2xl sm:text-3xl"><FaUsers /></span>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Customers</h3>
                    <p className="text-2xl sm:text-3xl font-bold">456</p>
                  </div>
                  <div className="bg-[#1E3A8A] text-white p-4 sm:p-6 rounded-lg flex flex-col items-center shadow-md hover:scale-105 hover:shadow-xl transition-all">
                    <span className="mb-2 text-2xl sm:text-3xl"><FaChartLine /></span>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Orders</h3>
                    <p className="text-2xl sm:text-3xl font-bold">89</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 text-slate-700 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">Why Choose Stock It?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border-2 border-black flex flex-col items-center text-center">
              <FaBoxOpen className="text-5xl text-[#1E3A8A] mb-4" />
              <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
              <p className="text-base text-gray-700">Track, add, update, and search products in real time. Stay on top of your stock with ease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-black flex flex-col items-center text-center">
              <FaFileInvoiceDollar className="text-5xl text-[#1E3A8A] mb-4" />
              <h3 className="text-xl font-bold mb-2">Order & Sales Management</h3>
              <p className="text-base text-gray-700">Create orders, manage sales, and generate professional bills and invoices in a few clicks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-black flex flex-col items-center text-center">
              <FaUsers className="text-5xl text-[#1E3A8A] mb-4" />
              <h3 className="text-xl font-bold mb-2">Customer Management</h3>
              <p className="text-base text-gray-700">Track customers, view purchase history, and build lasting relationships with your clients.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-black flex flex-col items-center text-center">
              <FaChartLine className="text-5xl text-[#1E3A8A] mb-4" />
              <h3 className="text-xl font-bold mb-2">Analytics & Insights</h3>
              <p className="text-base text-gray-700">Get actionable insights and real-time analytics to grow your business and boost revenue.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-black flex flex-col items-center text-center">
              <FaLock className="text-5xl text-[#1E3A8A] mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
              <p className="text-base text-gray-700">Robust login, registration, and password reset to keep your data safe and accessible.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-black flex flex-col items-center text-center">
              <FaBoxOpen className="text-5xl text-[#1E3A8A] mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Product Upload</h3>
              <p className="text-base text-gray-700">Bulk upload and image support make adding new products fast and simple.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <Image src="/dashboard.png" alt="Analytics" height={600} width={500} className="rounded-lg shadow border-2 border-black bg-white sm:h-80" />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Analytics & Insights</h2>
            <p className="text-lg text-gray-700 mb-4">Visualize your business performance with real-time analytics and actionable insights. Make data-driven decisions to grow your business.</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center border-2 border-black">
                <FaChartLine className="text-3xl text-[#1E3A8A] mb-2" />
                <span className="text-xl font-bold">+24%</span>
                <span className="text-xs text-gray-500">Sales Growth</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center border-2 border-black">
                <FaUsers className="text-3xl text-[#1E3A8A] mb-2" />
                <span className="text-xl font-bold">1,200</span>
                <span className="text-xs text-gray-500">Active Customers</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center border-2 border-black">
                <FaBoxOpen className="text-3xl text-[#1E3A8A] mb-2" />
                <span className="text-xl font-bold">3,400</span>
                <span className="text-xs text-gray-500">Products Tracked</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center border-2 border-black">
                <FaFileInvoiceDollar className="text-3xl text-[#1E3A8A] mb-2" />
                <span className="text-xl font-bold">$78K</span>
                <span className="text-xs text-gray-500">Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow border-2 border-black">
              <div className="flex items-center mb-4">
                <FaUser className="rounded-full text-xl h-10 w-10 border-2 border-[#1E3A8A] p-2" />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">John Doe</h4>
                  <p className="text-gray-600 text-sm">Retail Store Owner</p>
                </div>
              </div>
              <p className="text-base text-gray-700 mb-4">"Stock It made inventory a breeze! The dashboard is intuitive and the analytics are a game changer for my business."</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow border-2 border-black">
              <div className="flex items-center mb-4">
              <FaUser className="rounded-full text-xl h-10 w-10 border-2 border-[#1E3A8A] p-2" />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Sarah Miller</h4>
                  <p className="text-gray-600 text-sm">E-commerce Manager</p>
                </div>
              </div>
              <p className="text-base text-gray-700 mb-4">"Our sales tracking is now effortless. Stock It's order management and billing features save us hours every week."</p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow border-2 border-black">
              <div className="flex items-center mb-4">
              <FaUser className="rounded-full text-xl h-10 w-10 border-2 border-[#1E3A8A] p-2" />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Robert Kim</h4>
                  <p className="text-gray-600 text-sm">Warehouse Manager</p>
                </div>
              </div>
              <p className="text-base text-gray-700 mb-4">"Customer management is so much easier. We’ve seen a 30% increase in customer retention since using Stock It."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1E3A8A] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Join businesses using Stock It to manage their inventory and sales.</p>
          <Link href="/register">
            <button className="px-8 py-4 bg-white text-[#1E3A8A] rounded-lg shadow border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-lg font-bold">
              SignUp Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Stock It</h3>
            <p className="text-gray-400">Simplifying inventory and sales management for modern businesses.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
            <div>
              <h4 className="text-lg font-bold mb-2">Features</h4>
              <ul className="space-y-1">
                <li><a href="#features" className="text-gray-400 hover:text-white">Inventory Management</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Order & Sales Management</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Customer Management</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Analytics & Insights</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Secure Authentication</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Easy Product Upload</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Contact</h4>
              <ul className="space-y-1">
                <li className="text-gray-400">support@stockit.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

