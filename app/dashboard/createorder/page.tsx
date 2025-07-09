"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Product {
    _id: string;
    name: string;
    price: number;
    quantity?: number;
}

interface CartItem extends Product {
    quantity: number;
}

interface Customer {
    name: string;
    email: string;
    phone: string;
}

const CreateOrderPage = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customer, setCustomer] = useState<Customer>({
        name: '',
        email: '',
        phone: ''
    });
    const [bill,setBill] = useState({
        customer: '',
        items: [],
        total: 0
    })
    const searchProduct = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setProducts([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const encodedSearchTerm = encodeURIComponent(searchTerm);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/search?name=${encodedSearchTerm}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    setProducts([]);
                    setError('No products found');
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error searching products:', error);
            setError('Failed to search products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === product._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setSearchTerm('');
        setProducts([]);
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        return calculateSubtotal();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) {
            setError('Please add items to cart');
            return;
        }
        if (!customer.name || !customer.email || !customer.phone) {
            setError('Please fill in all customer details');
            return;
        }

        setLoading(true);
        try {
            console.log("cart", cart);
            console.log("customer", customer);
            console.log("total", calculateTotal());
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sales`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        customer: customer,
                        products: cart,
                        total: calculateTotal()
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const data = await response.json();
            console.log("data", data);
            router.push(`/dashboard/orders/${data._id}`);
        } catch (error) {
            console.error('Error creating order:', error);
            setError('Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm) {
                searchProduct(searchTerm);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-[#FFE5D4] p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border-4 border-[#2A2A2A] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-4xl font-black text-[#2A2A2A] mb-6">Create New Order</h1>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-[#FF6B6B] text-black rounded-lg border-4 border-[#2A2A2A] font-bold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Left Column - Product Search and Cart */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-lg font-bold text-[#2A2A2A]">
                                        Search Products
                                    </label>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Type to search products..."
                                        className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                                    />
                                </div>

                                {loading && (
                                    <div className="p-4 text-center font-bold text-[#2A2A2A]">Loading...</div>
                                )}

                                {!loading && products.length > 0 && (
                                    <div className="max-h-60 overflow-y-auto border-4 border-[#2A2A2A] rounded-lg">
                                        {products.map((product) => (
                                            <div
                                                key={product._id}
                                                className="p-3 hover:bg-[#FFE5D4] border-b-2 border-[#2A2A2A] last:border-b-0 flex justify-between items-center"
                                            >
        <div>
                                                    <div className="font-bold text-[#2A2A2A]">{product.name}</div>
                                                    <div className="text-sm text-[#2A2A2A]">${product.price.toFixed(2)}</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => addToCart(product)}
                                                    className="px-4 py-2 bg-[#4ECDC4] rounded-lg border-2 border-[#2A2A2A] font-bold text-[#2A2A2A] hover:bg-[#3DBDB4] transition-colors"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Shopping Cart */}
                                <div className="mt-6">
                                    <h2 className="text-2xl font-bold text-[#2A2A2A] mb-4">Shopping Cart</h2>
                                    {cart.length === 0 ? (
                                        <div className="text-center p-4 border-4 border-dashed border-[#2A2A2A] rounded-lg text-[#2A2A2A] font-bold">
                                            Cart is empty
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {cart.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="p-3 bg-[#FFE5D4] rounded-lg border-4 border-[#2A2A2A] flex items-center justify-between"
                                                >
                                                    <div className="flex-1">
                                                        <div className="font-bold text-[#2A2A2A]">{item.name}</div>
                                                        <div className="text-sm text-[#2A2A2A]">${item.price.toFixed(2)}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-[#FF6B6B] rounded-lg border-2 border-[#2A2A2A] font-bold text-[#2A2A2A]"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center font-bold text-[#2A2A2A]">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-[#4ECDC4] rounded-lg border-2 border-[#2A2A2A] font-bold text-[#2A2A2A]"
                                                        >
                                                            +
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFromCart(item._id)}
                                                            className="ml-2 w-8 h-8 flex items-center justify-center bg-[#FF6B6B] rounded-lg border-2 border-[#2A2A2A] font-bold text-[#2A2A2A]"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Customer Details and Bill Preview */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-[#2A2A2A]">Customer Details</h2>
                                    <div className="space-y-3">
                <div>
                                            <label className="block text-sm font-bold text-[#2A2A2A] mb-1">
                                                Name
                                            </label>
                    <input
                        type="text"
                                                value={customer.name}
                                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                                className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                        required
                    />
                </div>
                <div>
                                            <label className="block text-sm font-bold text-[#2A2A2A] mb-1">
                                                Email
                                            </label>
                    <input
                                                type="email"
                                                value={customer.email}
                                                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                                className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                        required
                    />
                </div>
                <div>
                                            <label className="block text-sm font-bold text-[#2A2A2A] mb-1">
                                                Phone
                                            </label>
                    <input
                                                type="tel"
                                                value={customer.phone}
                                                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                                className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                        required
                    />
                                        </div>
                                    </div>
                                </div>

                                {/* Bill Preview */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-[#2A2A2A]">Bill Preview</h2>
                                    <div className="p-4 bg-[#FFE5D4] rounded-lg border-4 border-[#2A2A2A]">
                                        <div className="space-y-2">
                                            <div className="flex justify-between font-black text-lg text-[#2A2A2A]">
                                                <span>Total Amount:</span>
                                                <span>${calculateTotal().toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-4 pt-6 border-t-4 border-[#2A2A2A]">
                            <button
                                type="submit"
                                disabled={loading || cart.length === 0}
                                className="flex-1 bg-[#4ECDC4] text-[#2A2A2A] py-3 px-6 rounded-lg border-4 border-[#2A2A2A] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
                            >
                                {loading ? 'Creating Order...' : 'Create Order'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard')}
                                className="flex-1 bg-[#FF6B6B] text-[#2A2A2A] py-3 px-6 rounded-lg border-4 border-[#2A2A2A] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateOrderPage;