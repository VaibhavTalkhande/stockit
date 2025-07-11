"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Order {
  _id: string;
  totalAmount: number;
  date: string;
  paymentStatus: string;
}

interface Purchase {
  _id: string;
  date: string;
  saleId: {
    _id: string;
    totalAmount: number;
    paymentStatus: string;
    date: string;
    products: { name: string; quantity: number; price: number; _id: string }[];
  };
}

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  purchases: Purchase[];
}

const CustomerDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/${id}`, {
          withCredentials: true,
        });
        setCustomer(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch customer");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchCustomer();
  }, [id]);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-[#FFE5D4] to-[#FFD6BA]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-6 text-[#2A2A2A]">Customer Details</h1>
        {error && (
          <div className="bg-red-100 border-2 border-[#2A2A2A] text-[#2A2A2A] px-4 py-3 rounded-lg mb-4 font-bold">{error}</div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#2A2A2A]"></div>
          </div>
        ) : customer ? (
          <div className="bg-white rounded-2xl border-4 border-[#2A2A2A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 mb-8">
            <div className="mb-4">
              <div className="text-lg font-bold text-[#2A2A2A]">Name:</div>
              <div className="text-xl font-black text-[#2A2A2A] mb-2">{customer.name}</div>
              <div className="text-lg font-bold text-[#2A2A2A]">Email:</div>
              <div className="text-base text-[#2A2A2A] mb-2">{customer.email}</div>
              {customer.phone && (
                <>
                  <div className="text-lg font-bold text-[#2A2A2A]">Phone:</div>
                  <div className="text-base text-[#2A2A2A] mb-2">{customer.phone}</div>
                </>
              )}
            </div>
            <h2 className="text-xl font-black mb-2 mt-6 text-[#2A2A2A]">Purchases</h2>
            <Box sx={{ height: 400, width: '100%', background: 'white', borderRadius: 2, boxShadow: 1, p: 1 }}>
              <DataGrid
                rows={customer.purchases.map((purchase) => ({
                  id: purchase._id,
                  orderId: purchase.saleId._id,
                  products: purchase.saleId.products.map((p) => p.name).join(", "),
                  quantity: purchase.saleId.products.reduce((sum, p) => sum + p.quantity, 0),
                  total: purchase.saleId.totalAmount,
                  status: purchase.saleId.paymentStatus,
                  date: purchase.saleId.date,
                }))}
                columns={[
                  {
                    field: 'orderId',
                    headerName: 'Order ID',
                    width: 120,
                    renderCell: (params) => (
                      <span className="font-mono font-bold text-[#2A2A2A]">
                        {params.value.slice(-6).toUpperCase()}
                      </span>
                    ),
                  },
                  { field: 'products', headerName: 'Product(s)', width: 160 },
                  { field: 'quantity', headerName: 'Quantity', width: 100 },
                  {
                    field: 'total',
                    headerName: 'Total',
                    width: 100,
                    renderCell: (params) => (
                      <span className="font-bold text-[#2A2A2A]">${params.value.toFixed(2)}</span>
                    ),
                  },
                  {
                    field: 'status',
                    headerName: 'Status',
                    width: 110,
                    renderCell: (params) => (
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-black border-2 border-[#2A2A2A] ${
                          params.value === 'paid'
                            ? 'bg-gradient-to-br from-[#4ECDC4] to-[#6EDDD6] text-[#2A2A2A]'
                            : params.value === 'pending'
                            ? 'bg-gradient-to-br from-[#FFE66D] to-[#FFF07C] text-[#2A2A2A]'
                            : 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] text-[#2A2A2A]'
                        }`}
                      >
                        {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
                      </span>
                    ),
                  },
                  {
                    field: 'date',
                    headerName: 'Date',
                    width: 120,
                    renderCell: (params) => (
                      <span className="text-[#2A2A2A]">
                        {params.value ? new Date(params.value).toLocaleDateString() : 'N/A'}
                      </span>
                    ),
                  },
                ] as GridColDef[]}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 7,
                    },
                  },
                }}
                pageSizeOptions={[5, 7, 10]}
                disableRowSelectionOnClick
                sx={{
                  '& .MuiDataGrid-columnHeaders': { background: '#FFD6BA', fontWeight: 900, color: '#2A2A2A' },
                  '& .MuiDataGrid-cell': { color: '#2A2A2A', fontWeight: 500 },
                  '& .MuiDataGrid-row:hover': { background: '#FFE5D4' },
                  border: '2px solid #2A2A2A',
                }}
                localeText={{ noRowsLabel: 'No purchases found for this customer.' }}
              />
            </Box>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomerDetailsPage;