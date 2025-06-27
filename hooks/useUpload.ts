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
            withCredentials: false, // Changed to false for Cloudinary
            timeout: 30000, // 30 seconds timeout
        };

        // Ensure the Cloudinary URL is properly formatted
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
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new Error(`Upload failed: ${error.response.data?.message || error.response.statusText}`);
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('No response received from Cloudinary. Please check your network connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(`Upload failed: ${error.message}`);
            }
        }
        throw error;
    }
}