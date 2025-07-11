import axios from 'axios';

export const useUpload = async({image}: {image: File}) => {
    if (!image) {
        throw new Error('No image provided');
    }
    if (image.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Image size exceeds 5MB limit');
    }
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(image.type)) {
        throw new Error('Invalid image type. Only JPEG, PNG, and GIF are allowed');
    }
    try{
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string);
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: false, 
            timeout: 30000,
        };

        const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
        if (!cloudinaryUrl) {
            throw new Error('Cloudinary API URL is not configured');
        }

        const response = await axios.post(cloudinaryUrl, formData, config);
        
        if (!response.data || !response.data.secure_url) {
            throw new Error('Invalid response from Cloudinary');
        }

        console.log('Upload successful:', response.data);
        return response.data.secure_url;
    } catch (error) {
        console.error('Upload failed:', error);
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(`Upload failed: ${error.response.data?.message || error.response.statusText}`);
            } else if (error.request) {
                throw new Error('No response received from Cloudinary. Please check your network connection.');
            } else {
                throw new Error(`Upload failed: ${error.message}`);
            }
        }
        throw error;
    }
}