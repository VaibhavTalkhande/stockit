'use client'
import axios from "axios";
import { includes } from "lodash";
import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: 'orders',
      width: 60,
    },
  ],
  height: 300,
};

interface Order {
    paymentStatus: 'pending' | 'paid' | 'failed'; // Extend this union if needed
    _id: string;
    storeName: string;
    customer: {
      _id: string;
      name: string;
      email: string;
    };
    products: {
      productId: string
      name:string;
      quantity: number;
      price: number;
      _id: string;
    }[];
    totalAmount: number;
    date: string; // ISO string format
    createdAt: string;
    updatedAt: string;
}


const page = () => {
    const [sales, setSales] = useState<Order[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sales/getsales`, {
              withCredentials: true,
            });
            setSales(res.data);
          } catch (error) {
            console.error(error);
            setSales([]);
          }
        };
        fetchData();
    }, []);

    // Aggregate total spent per customer
    const customerTotals: { [customer: string]: number } = {};

    sales.forEach(order => {
      const name = order.customer.name;
      if (customerTotals[name]) {
        customerTotals[name] += order.totalAmount;
      } else {
        customerTotals[name] = order.totalAmount;
      }
    });

    const chartData = Object.entries(customerTotals).map(([customer, totalAmount]) => ({
      customer,
      totalAmount
    }));
    const ProductTotalSales: { [product: string]: number } = {};
    sales.forEach(order => {
        order.products.forEach(product => {
            console.log(product)
            const name = product.name
            if (ProductTotalSales[name]) {
                ProductTotalSales[name] += product.quantity;
            } else {
                ProductTotalSales[name] = product.quantity;
            }
        });
    })
    const pieChartData = Object.entries(ProductTotalSales).map(([product,quantitySold])=>({
        product,
        quantitySold
    }))
  return (
    <div className="min-h-screen bg-[#FFE5D4] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-[#2A2A2A] mb-8">Sales Overview</h1>

        <div className="bg-white rounded-lg border-4 border-[#2A2A2A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
           {sales
                &&
                <div>
                    <BarChart 
                    dataset={chartData}
                    xAxis={[{ scaleType: 'band', dataKey: 'customer', label: 'Customer' }]}
                    series={[{ dataKey: 'totalAmount', label: 'Total Amount ($)' }]}
                    {...chartSetting}
                    />
                    <PieChart
                        series={[
                            {
                              data: pieChartData.map(({ product, quantitySold }) => ({
                                id: product,
                                value: quantitySold,
                                label: product,
                              })),
                              highlightScope: { fade: 'global', highlight: 'item' },
                              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                              valueFormatter: (value: any) => value.value,
                            },
                        ]}
                          height={200}
                          width={200}
                          />
                </div>
                    
            }
        </div>
      </div>
    </div>
  )
}

export default page