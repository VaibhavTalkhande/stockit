'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Hero Section */}
      <header className="min-h-screen bg-[#1E3A8A] text-white flex items-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">Stock It</h1>
              <p className="text-2xl md:text-3xl mb-12 leading-relaxed">Streamline Your Inventory Management with Modern Solutions</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-[#1E3A8A] rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-lg font-bold">
                  Get Started
                </button>
                <button className="px-8 py-4 bg-transparent text-white rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-lg font-bold">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#1E3A8A] text-white p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">Inventory</h3>
                    <p className="text-4xl font-bold">1,234</p>
                  </div>
                  <div className="bg-[#1E3A8A] text-white p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">Sales</h3>
                    <p className="text-4xl font-bold">$5,678</p>
                  </div>
                  <div className="bg-[#1E3A8A] text-white p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">Customers</h3>
                    <p className="text-4xl font-bold">456</p>
                  </div>
                  <div className="bg-[#1E3A8A] text-white p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">Orders</h3>
                    <p className="text-4xl font-bold">89</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 text-slate-700">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Inventory Management */}
            <div className="bg-white p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              <div className="bg-[#1E3A8A] w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Inventory Management</h3>
              <p className="text-lg text-gray-700">Track and manage your inventory in real-time with our intuitive dashboard.</p>
            </div>

            {/* Bill Generation */}
            <div className="bg-white p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              <div className="bg-[#1E3A8A] w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Bill Generation</h3>
              <p className="text-lg text-gray-700">Create professional bills and invoices with just a few clicks.</p>
            </div>

            {/* Customer Management */}
            <div className="bg-white p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              <div className="bg-[#1E3A8A] w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Customer Management</h3>
              <p className="text-lg text-gray-700">Manage your customers and their purchase history efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Analytics & Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              <h3 className="text-2xl font-bold mb-6">Sales Performance</h3>
              <div className="h-80 relative">
                {/* Bar Graph */}
                <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-between px-4">
                  <div className="w-12 bg-[#1E3A8A] h-3/4 rounded-t-lg"></div>
                  <div className="w-12 bg-[#1E3A8A] h-1/2 rounded-t-lg"></div>
                  <div className="w-12 bg-[#1E3A8A] h-5/6 rounded-t-lg"></div>
                  <div className="w-12 bg-[#1E3A8A] h-2/3 rounded-t-lg"></div>
                  <div className="w-12 bg-[#1E3A8A] h-4/5 rounded-t-lg"></div>
                  <div className="w-12 bg-[#1E3A8A] h-3/5 rounded-t-lg"></div>
                </div>
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-sm text-gray-600">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              <h3 className="text-2xl font-bold mb-6">Inventory Trends</h3>
              <div className="h-80 relative">
                {/* Line Graph */}
                <div className="absolute bottom-0 left-0 right-0 h-full">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M0,80 L20,60 L40,70 L60,40 L80,50 L100,30"
                      stroke="#1E3A8A"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M0,80 L20,60 L40,70 L60,40 L80,50 L100,30"
                      stroke="#1E3A8A"
                      strokeWidth="1"
                      fill="rgba(30, 58, 138, 0.1)"
                    />
                  </svg>
                </div>
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-sm text-gray-600">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold">John Doe</h4>
                  <p className="text-gray-600">Retail Store Owner</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6">"Stock It has revolutionized how we manage our inventory. The real-time tracking and analytics have helped us reduce stockouts by 40%."</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  SM
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold">Sarah Miller</h4>
                  <p className="text-gray-600">E-commerce Manager</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6">"The bill generation feature has saved us countless hours. The templates are professional and customizable. Highly recommended!"</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  RK
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold">Robert Kim</h4>
                  <p className="text-gray-600">Warehouse Manager</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6">"The customer management system is intuitive and powerful. We've seen a 30% increase in customer retention since implementation."</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1E3A8A] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-12">Join thousands of businesses using Stock It to manage their inventory.</p>
          <button className="px-8 py-4 bg-white text-[#1E3A8A] rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-lg font-bold">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Stock It</h3>
              <p className="text-gray-400">Simplifying inventory management for modern businesses.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Inventory Management</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Bill Generation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Customer Management</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Email Marketing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@stockit.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">123 Business St, Suite 100</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

