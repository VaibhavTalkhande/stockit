'use client'
import axios from "axios";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from "react";


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
      productId: {
        _id: string;
        name: string;
        price: number;
      };
      quantity: number;
      price: number;
      _id: string;
    }[];
    totalAmount: number;
    date: string; // ISO string format
    createdAt: string;
    updatedAt: string;
    __v: number;
}


const page = () => {
    const [sales,setSales] = useState<Order[]>([])
    // const [statusFilter, setStatusFilter] = useState('');
    // const [customerFilter, setCustomerFilter] = useState('');
    // const [sortFilter, setSortFilter] = useState('');
    // const [page,setPage] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sales/getsales`, {
              withCredentials: true,
            });
            
            console.log("API response:", res.data);
            setSales(res.data);
          } catch (error) {
            console.error(error);
            setSales([]);
          }
        };
        fetchData();
    },[]);

    // const filteredSales = sales.filter(order => {
    //   const statusMatch = statusFilter ? order.paymentStatus === statusFilter : true;
    //   const customerMatch = customerFilter
    //     ? order.customer?.name.toLowerCase().includes(customerFilter.toLowerCase())
    //     : true;
    //   return statusMatch && customerMatch;
    // });

    // const sortedSales = [...filteredSales].sort((a, b) => {
    //   if (sortFilter === "new") {
    //     return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    //   } else if (sortFilter === "old") {
    //     return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    //   } else {
    //     return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    //   }
    // });
    const columns: GridColDef[] = [
      { 
        field: '_id', 
        headerName: 'Order ID', 
        width: 300,
        renderCell: (params) => params.value
      },
      {
        field: 'customer',
        headerName: 'Customer',
        width: 300,
        renderCell: (params) => params.value?.name || 'N/A'
      },
      {
        field: 'totalAmount',
        headerName: 'Total Amount',
        width: 130,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`
      },
      {
        field: 'paymentStatus',
        headerName: 'Payment Status',
        width: 140,
        renderCell: (params) => {
          const status = params.value;
          const getStatusColor = (status: string) => {
            switch (status) {
              case 'paid': return 'bg-green-500 text-white';
              case 'pending': return 'bg-yellow-500 text-white';
              case 'failed': return 'bg-red-500 text-white';
              default: return 'bg-gray-500 text-white';
            }
          };
          return (
            <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(status)}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        }
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 120,
        renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString() : 'N/A'
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        renderCell: (params) => (
          <a
            href={`/dashboard/orders/${params.row._id}`}
            className="inline-block px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            View Details
          </a>
        )
      }
    ];
    
    const rows = [...sales].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    

  return (
    <div className="min-h-screen bg-[#FFE5D4] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-[#2A2A2A] mb-8">Sales Overview</h1>
        {/* <div className="flex gap-4 mb-4 bg-blue-400">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        <select
            value={sortFilter}
            onChange={e=>setSortFilter(e.target.value)}
            className="border px-2 py-1 rounded"
            >
                <option value="">sort</option>
                <option value="new">new</option>
                <option value="old">old</option>
            </select>
          <input
            type="text"
            placeholder="Customer name"
            value={customerFilter}
            onChange={e => setCustomerFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div className="bg-white rounded-lg border-4 border-[#2A2A2A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#FFE66D] border-b-4 border-[#2A2A2A]">
                <th className="px-6 py-4 text-left font-black text-[#2A2A2A] border-r-2 border-[#2A2A2A]">Order ID</th>
                <th className="px-6 py-4 text-left font-black text-[#2A2A2A] border-r-2 border-[#2A2A2A]">Customer</th>
                <th className="px-6 py-4 text-left font-black text-[#2A2A2A] border-r-2 border-[#2A2A2A]">Total Amount</th>
                <th className="px-6 py-4 text-left font-black text-[#2A2A2A] border-r-2 border-[#2A2A2A]">Payment Status</th>
                <th className="px-6 py-4 text-left font-black text-[#2A2A2A] border-r-2 border-[#2A2A2A]">Date</th>
                <th className="px-6 py-4 text-center font-black text-[#2A2A2A]">Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedSales && sortedSales.length > 0 ? (
                sortedSales.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b-2 border-[#2A2A2A] hover:bg-[#FFD6BA] transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-[#2A2A2A] border-r-2 border-[#2A2A2A]">
                      {order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#2A2A2A] border-r-2 border-[#2A2A2A]">
                      {order.customer?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#2A2A2A] border-r-2 border-[#2A2A2A]">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 border-r-2 border-[#2A2A2A]">
                      {order.paymentStatus === "paid" ? (
                        <span className="px-3 py-1 bg-[#4ECDC4] text-[#2A2A2A] rounded-lg text-sm font-bold border-2 border-[#2A2A2A]">
                          Paid
                        </span>
                      ) : order.paymentStatus === "pending" ? (
                        <span className="px-3 py-1 bg-[#FFE66D] text-[#2A2A2A] rounded-lg text-sm font-bold border-2 border-[#2A2A2A]">
                          Pending
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-[#FF6B6B] text-[#2A2A2A] rounded-lg text-sm font-bold border-2 border-[#2A2A2A]">
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#2A2A2A] border-r-2 border-[#2A2A2A]">
                      {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a
                        href={`/dashboard/orders/${order._id}`}
                        className="inline-block px-4 py-2 bg-[#2A2A2A] text-white rounded-lg border-2 border-[#2A2A2A] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#4ECDC4] hover:text-[#2A2A2A] transition-all"
                      >
                        Go to Details
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#2A2A2A] font-bold">
                    No sales found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
        <Box sx={{ height: "80%", width: '100%' }} className="bg-blue-400">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row)=> row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
      </div>
    </div>
  )
}

export default page