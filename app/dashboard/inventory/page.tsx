'use client'
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
}

const InventoryPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!user && isClient) {
            router.push('/login');
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
                    withCredentials: true,
                });

                if (response.status !== 200) {
                    throw new Error(response.data.message || 'Failed to fetch products');
                }

                const data = response.data;
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setError('Invalid data format received from server');
                    setProducts([]);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (isClient && user) {
            fetchProducts();
        }
    }, [user, router, isClient]);

    const handleUpdate = (updatedProduct: Product) => {
        setProducts(products.map(product => 
            product._id === updatedProduct._id ? updatedProduct : product
        ));
    };

    const filteredProducts = Array.isArray(products) ? products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'name') {
                return sortOrder === 'asc' 
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortBy === 'price') {
                return sortOrder === 'asc'
                    ? a.price - b.price
                    : b.price - a.price;
            } else if (sortBy === 'stock') {
                return sortOrder === 'asc'
                    ? a.stock - b.stock
                    : b.stock - a.stock;
            }
            return 0;
        }) : [];

    const categories = Array.isArray(products) ? [...new Set(products.map(product => product.category))] : [];

    if (!isClient) {
        return null;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Inventory</h1>
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-50"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-50"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-50"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                            <option value="stock">Sort by Stock</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onUpdate={handleUpdate}
                            />
                        ))}
                    </div>
                )}

                {!isLoading && filteredProducts.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-xl font-bold text-gray-600">No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryPage;