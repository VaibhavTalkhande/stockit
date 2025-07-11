"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

interface Customer {
  _id: string;
  name: string;
  email: string;
}

const EditCustomerPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
        console.log(res.data)
        setForm({ name: res.data.name, email: res.data.email });
      } catch (err: any) {
        setError(err.message || "Failed to fetch customer");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchCustomer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/${id}`, form, {
        withCredentials: true,
      });
      toast.success("Customer updated successfully!");
      router.push(`/dashboard/customers/${id}`);
    } catch (err: any) {
      setError(err.message || "Failed to update customer");
      toast.error(err.message || "Failed to update customer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-[#FFE5D4] to-[#FFD6BA]">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-black mb-6 text-[#2A2A2A]">Edit Customer</h1>
        {error && (
          <div className="bg-red-100 border-2 border-[#2A2A2A] text-[#2A2A2A] px-4 py-3 rounded-lg mb-4 font-bold">{error}</div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#2A2A2A]"></div>
          </div>
        ) : customer ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border-4 border-[#2A2A2A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block font-bold text-[#2A2A2A] mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#2A2A2A] bg-[#FFF7F0] font-semibold"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold text-[#2A2A2A] mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD6BA] text-[#2A2A2A] bg-[#FFF7F0] font-semibold"
                required
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full mt-2 p-3 bg-[#2A2A2A] text-[#FFD6BA] font-black rounded-lg border-2 border-[#2A2A2A] hover:bg-[#FFD6BA] hover:text-[#2A2A2A] transition-all text-lg disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default EditCustomerPage; 