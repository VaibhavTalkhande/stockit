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
        <div className="p-6 bg-white text-black">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-6">Inventory</h1>
                
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 rounded-lg mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        
                        <div className="flex gap-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
                                className="px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price">Sort by Price</option>
                                <option value="stock">Sort by Stock</option>
                            </select>

                            <button
                                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                                className="px-4 py-2 bg-black text-white border-2 border-black rounded-lg font-bold hover:bg-white hover:text-black transition-all"
                            >
                                {sortOrder === 'asc' ? '↑' : '↓'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-200 border-2 border-black text-black px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <p className="text-xl font-bold">No products found</p>
                </div>
            )}
        </div>
    );
};

export default InventoryPage;