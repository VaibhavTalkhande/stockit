'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useUpload } from '@/hooks/useUpload';

const AddProductPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null as File | null
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        setIsClient(true);
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                setError('Please upload a valid image file (JPEG, PNG, or GIF)');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        setUploadProgress(0);

        try {
            let imageUrl = '';
            
            if (formData.image) {
                try {
                    setUploadProgress(30);
                    imageUrl = await useUpload({ image: formData.image });
                    setUploadProgress(70);
                } catch (err) {
                    throw new Error('Failed to upload image: ' + (err instanceof Error ? err.message : 'Unknown error'));
                }
            }

            setUploadProgress(80);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
                method: 'POST',
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
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create product');
            }

            setUploadProgress(100);
            router.push('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setUploadProgress(0);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isClient) {
        return null;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#FFE5D4] p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg border-4 border-[#2A2A2A] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-4xl font-black text-[#2A2A2A] mb-6">Add Product</h1>
                    
                    {error && (
                        <div className="mb-6 p-4 bg-[#FF6B6B] text-black rounded-lg border-4 border-[#2A2A2A] font-bold">
                            {error}
                        </div>
                    )}

                    {isSubmitting && (
                        <div className="mb-6">
                            <div className="w-full bg-[#2A2A2A] rounded-lg h-4 border-2 border-[#2A2A2A]">
                                <div 
                                    className="bg-[#4ECDC4] h-full rounded-md transition-all duration-300" 
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <p className="mt-2 text-sm font-bold text-[#2A2A2A]">
                                {uploadProgress}% Complete
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-lg font-bold text-[#2A2A2A] mb-2">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                                    placeholder="Enter product name"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-lg font-bold text-[#2A2A2A] mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors resize-none"
                                    placeholder="Enter product description"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="price" className="block text-lg font-bold text-[#2A2A2A] mb-2">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="stock" className="block text-lg font-bold text-[#2A2A2A] mb-2">
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-lg font-bold text-[#2A2A2A] mb-2">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors"
                                >
                                    <option value="">Select a category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="food">Food</option>
                                    <option value="books">Books</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-lg font-bold text-[#2A2A2A] mb-2">
                                    Product Image
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="w-full p-3 rounded-lg border-4 border-[#2A2A2A] bg-white text-[#2A2A2A] font-bold focus:outline-none focus:border-[#4ECDC4] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-[#2A2A2A] file:text-[#2A2A2A] file:font-bold file:bg-[#4ECDC4] hover:file:bg-[#3DBDB4]"
                                    />
                                </div>
                                {formData.image && (
                                    <p className="mt-2 text-sm font-bold text-[#2A2A2A]">
                                        Selected: {formData.image.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 border-t-4 border-[#2A2A2A]">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-[#4ECDC4] text-[#2A2A2A] py-3 px-6 rounded-lg border-4 border-[#2A2A2A] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Add Product'}
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

export default AddProductPage;