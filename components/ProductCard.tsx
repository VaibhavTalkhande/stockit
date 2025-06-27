'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useUpload } from '@/hooks/useUpload';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
}

interface ProductCardProps {
    product: Product;
    onUpdate: (updatedProduct: Product) => void;
}

const ProductCard = ({ product, onUpdate }: ProductCardProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        image: null as File | null
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                image: e.target.files![0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            let imageUrl = product.image;
            
            if (formData.image) {
                try {
                    imageUrl = await useUpload({ image: formData.image });
                } catch (err) {
                    throw new Error('Failed to upload image: ' + (err instanceof Error ? err.message : 'Unknown error'));
                }
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    stock: parseInt(formData.stock),
                    image: imageUrl
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update product');
            }

            const updatedProduct = await response.json();
            onUpdate(updatedProduct);
            setIsDialogOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="text-black bg-white border-4 border-[#2A2A2A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all h-[24rem] flex flex-col">
                <div className="relative h-40 w-full p-0.5 rounded-lg overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-3 flex flex-col flex-1">
                    <h3 className="text-lg font-black text-[#2A2A2A] mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-[#2A2A2A] mb-2 line-clamp-3 flex-1 text-sm truncate">{product.description}</p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-black text-[#2A2A2A]">${product.price.toFixed(2)}</span>
                            <span className="px-2 py-1 bg-[#FFE5D4] border-2 border-[#2A2A2A] rounded-full text-xs font-bold text-[#2A2A2A]">
                                Stock: {product.stock}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="px-2 py-1 bg-[#4ECDC4] border-2 border-[#2A2A2A] rounded-full text-xs font-bold text-[#2A2A2A]">
                                {product.category}
                            </span>
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="px-3 py-1.5 bg-[#2A2A2A] text-white border-2 border-[#2A2A2A] rounded-lg font-bold hover:bg-white hover:text-[#2A2A2A] transition-all text-sm"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white border-4 border-[#2A2A2A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 max-w-md w-full rounded-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-black text-[#2A2A2A] mb-4">Update Product</h2>
                        
                        {error && (
                            <div className="mb-4 p-4 bg-[#FF6B6B] text-[#2A2A2A] rounded-lg border-4 border-[#2A2A2A] font-bold">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-lg font-bold text-[#2A2A2A] mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-[#2A2A2A] mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-[#2A2A2A] mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-[#2A2A2A] mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                                >
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="food">Food</option>
                                    <option value="books">Books</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-[#2A2A2A] mb-2">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-[#2A2A2A] mb-2">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-[#2A2A2A] file:text-[#2A2A2A] file:font-bold file:bg-[#4ECDC4] hover:file:bg-[#3DBDB4]"
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t-4 border-[#2A2A2A]">
                                <button
                                    type="button"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="px-6 py-3 bg-[#FF6B6B] text-[#2A2A2A] border-4 border-[#2A2A2A] rounded-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-[#4ECDC4] text-[#2A2A2A] border-4 border-[#2A2A2A] rounded-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard; 