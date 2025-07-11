"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { toast } from "react-toastify";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface Customer {
  _id: string;
  name: string;
  email: string;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers`, {
          withCredentials: true,
        });
        setCustomers(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch customers");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/${id}`, {
        withCredentials: true,
      });
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      toast.success("Customer deleted successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete customer");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 220 },
    { field: 'email', headerName: 'Email', width: 260 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2 h-full py-2 justify-center items-center align-middle">
          <a
            href={`/dashboard/customers/${params.row._id}`}
            className="inline-block align-middle px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            View
          </a>
          <a
            href={`/dashboard/customers/edit/${params.row._id}`}
            className="inline-block px-3 py-1 bg-yellow-500 text-white rounded text-xs font-bold hover:bg-yellow-600 transition-colors"
          >
            Edit
          </a>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600 transition-colors"
            onClick={() => setDeleteId(params.row._id)}
            disabled={deleting}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Customers</h1>
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <Box sx={{ height: 500, width: '100%', background: 'white', borderRadius: 2, boxShadow: 2, p: 2 }}>
          <DataGrid
            rows={customers}
            columns={columns}
            getRowId={(row) => row._id}
            loading={isLoading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
          />
        </Box>
        <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
          <DialogTitle>Delete Customer</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this customer? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)} disabled={deleting}>Cancel</Button>
            <Button onClick={() => deleteId && handleDelete(deleteId)} color="error" disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomersPage;
