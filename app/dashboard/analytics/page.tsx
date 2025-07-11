'use client'
import axios from "axios";
import { includes } from "lodash";
import { useEffect, useState, useRef } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts";
import { LineChart } from '@mui/x-charts/LineChart';

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

interface Suggestion{
  title:string;
  category:string;
  description:string;
}

const page = () => {
    const [sales, setSales] = useState<Order[]>([]);
    const [aiSuggestion, setAiSuggestion] = useState<Suggestion[]>();
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");
    const pieChartContainerRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
      const fetchSuggestion = async () => {
        setAiLoading(true);
        setAiError("");
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ai/suggestions`,{
            method:"GET",
            credentials:"include"
          });
          if (!res.ok) throw new Error("Failed to fetch suggestions");
          const data = await res.json();
          setAiSuggestion(JSON.parse(data.suggestions));
          console.log(JSON.parse(data.suggestions))
        } catch (err: any) {
          setAiError(err.message || "Failed to get AI suggestions");
        } finally {
          setAiLoading(false);
        }
      };
      fetchSuggestion();
    }, []);

    const salesByDate: { [date: string]: number } = {};
    sales.forEach(order => {
        const date = order.date.slice(0, 10); 
        if (salesByDate[date]) {
            salesByDate[date] += order.totalAmount;
        } else {
            salesByDate[date] = order.totalAmount;
        }
    });
    const sortedDates = Object.keys(salesByDate).sort();
    const lineChartData = sortedDates.map(date => ({ date, total: salesByDate[date] }));

    // --- Bar Chart: Total Spent Per Customer ---
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

    // --- Pie Chart: Product Sales ---
    const ProductTotalSales: { [product: string]: number } = {};
    sales.forEach(order => {
        order.products.forEach(product => {
            const name = product.name;
            if (ProductTotalSales[name]) {
                ProductTotalSales[name] += product.quantity;
            } else {
                ProductTotalSales[name] = product.quantity;
            }
        });
    });
    const pieChartData = Object.entries(ProductTotalSales).map(([product,quantitySold])=>(
        { product, quantitySold }
    ));

    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-orange-100 to-pink-100 p-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-4xl font-black text-[#2A2A2A] mb-8">Sales Analytics</h1>

          {/* Sales Trend Line Chart */}
          <div className="bg-white rounded-lg border-4 border-[#2A2A2A] shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#2A2A2A]">Sales Trend</h2>
            <div className="overflow-x-auto">
              <LineChart
                xAxis={[{ data: sortedDates, label: 'Date', scaleType: 'band' }]}
                series={[{ data: lineChartData.map(d => d.total), label: 'Total Sales ($)', color: '#1976d2' }]}
                height={300}
                width={Math.max(500, sortedDates.length * 60)}
                margin={{ left: 60, right: 30, top: 30, bottom: 50 }}
              />
            </div>
          </div>

          {/* Bar and Pie Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bar Chart: Customer Spend */}
            <div className="bg-white rounded-lg border-4 border-[#2A2A2A] shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-[#2A2A2A]">Total Spent Per Customer</h2>
              <div className="overflow-x-auto">
                <BarChart
                  dataset={chartData}
                  xAxis={[{ scaleType: 'band', dataKey: 'customer', label: 'Customer' }]}
                  series={[{ dataKey: 'totalAmount', label: 'Total Amount ($)', color: '#ff9800' }]}
                  height={300}
                  width={Math.max(500, chartData.length * 100)}
                  margin={{ left: 10, right: 30, top: 30, bottom: 50 }}
                />
              </div>
            </div>
            {/* Pie Chart: Product Sales */}
            <div className="bg-white rounded-lg border-4 border-[#2A2A2A] shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold mb-4 text-[#2A2A2A]">Product Sales Distribution</h2>
              <div ref={pieChartContainerRef} className="w-full flex justify-center">
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
                  height={300}
                  width={undefined}
                  style={{ width: '100%', maxWidth: 400 }}
                  slotProps={{ legend: { position: { vertical: 'bottom', horizontal: 'center' } } }}
                />
              </div>
            </div>
          </div>

        </div>
          {/* AI Suggestions Box at the bottom */}
          <div className="flex flex-col items-center mt-10 w-full px-2 sm:px-4">
            {aiLoading && (
              <div className="bg-blue-100 border border-blue-300 text-blue-700 px-4 py-3 rounded-lg mb-4 font-bold max-w-2xl w-full text-center">
                Getting AI Suggestions...
              </div>
            )}
            {aiError && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 font-bold max-w-2xl w-full text-center">
                {aiError}
              </div>
            )}
            {aiSuggestion && (
              <div className="bg-white border-4 border-[#2A2A2A] rounded-xl shadow p-4 sm:p-6 w-full text-[#2A2A2A] mt-10">
                <h3 className="text-xl sm:text-2xl font-black mb-4 text-[#1976d2] text-center">
                  AI Suggestions
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-[#F3F4F6] border-b-2 border-[#2A2A2A]">
                        <th className="px-4 py-2 text-left text-base sm:text-lg font-bold text-[#2A2A2A] border-r-2 border-[#2A2A2A]">Category</th>
                        <th className="px-4 py-2 text-left text-base sm:text-lg font-bold text-[#2A2A2A] border-r-2 border-[#2A2A2A]">Title</th>
                        <th className="px-4 py-2 text-left text-base sm:text-lg font-bold text-[#2A2A2A]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aiSuggestion.map((suggestion) => (
                        <tr key={suggestion.title} className="border-b border-gray-200 hover:bg-[#FDF6E3] transition-all">
                          <td className="px-4 py-2 align-top">
                            <span className="inline-block bg-[#4ECDC4] text-[#2A2A2A] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                              {suggestion.category}
                            </span>
                          </td>
                          <td className="px-4 py-2 align-top text-[#ff9800] font-bold text-base sm:text-lg">
                            {suggestion.title}
                          </td>
                          <td className="px-4 py-2 align-top text-gray-700 whitespace-pre-line text-base sm:text-lg">
                            {suggestion.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
      </div>
    );
}

export default page