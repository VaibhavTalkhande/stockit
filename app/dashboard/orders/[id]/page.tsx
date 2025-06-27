"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import store from '../../../../store/index';

interface OrderDetails {
    _id: string;
    storeName: string;
    customer: {
        _id: string;
        name: string;
        email: string;
    };
    products: {
        productId: string;
        name: string;
        quantity: number;
        price: number;
        _id: string;
    }[];
    totalAmount: number;
    paymentStatus: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
const OrderDetailsPage = () => {
    const params = useParams();
    const { id } = params;
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const response = axios.get(`http://localhost:5000/api/sales/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await response;
                if (res.status === 200) {
                    console.log("Order Details:", res.data);
                    setOrderDetails(res.data);
                } else {
                    console.error("Failed to fetch order details");
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };
        fetchOrderDetails();
    }, [id]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 text-black py-8 px-2">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-extrabold mb-2 text-blue-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Order Details
                </h1>
                <p className="text-lg mb-4 text-gray-700">Order ID: <span className="font-mono bg-gray-200 rounded px-2 py-0.5">{id}</span></p>
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2 text-gray-800">Order Items</h2>
                    <div className="mb-2 flex flex-col gap-1">
                        <p className="text-base font-medium">Store: <span className="text-blue-600">{orderDetails?.storeName}</span></p>
                        <p className="text-base font-medium">Customer: <span className="text-blue-600">{orderDetails?.customer?.name}</span></p>
                    </div>
                    <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                        <thead>
                            <tr className="bg-blue-50 border-b">
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Product Name</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Quantity</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails && orderDetails.products && orderDetails.products.length > 0 ? (
                                orderDetails.products.map((item) => (
                                    <tr key={item._id} className="border-b hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-2">{item.name}</td>
                                        <td className="px-4 py-2">{item.quantity}</td>
                                        <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-4 py-2 text-center text-gray-500">No items in this order.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                    <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        Total Amount:
                        <span className="text-2xl text-green-600 font-bold">${orderDetails?.totalAmount.toFixed(2)}</span>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                        Payment Status:
                        {orderDetails?.paymentStatus === 'Paid' ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Paid</span>
                        ) : orderDetails?.paymentStatus === 'Pending' ? (
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Pending</span>
                        ) : (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">{orderDetails?.paymentStatus || 'Unknown'}</span>
                        )}
                    </p>
                    <p className="text-sm text-gray-500">
                        Order Date: {orderDetails?.date ? new Date(orderDetails.date).toLocaleDateString() : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;