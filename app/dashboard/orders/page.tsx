"use client";
import { useParams } from "next/navigation";



const OrdersPage = () => {
    const params = useParams();
    const { id } = params;
    return (
        <div>
            <h1>Orders</h1>
            <p>Order ID: {id}</p>
        </div>
    );
};

export default OrdersPage;