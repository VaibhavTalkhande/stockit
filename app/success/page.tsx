import React from 'react';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
const success: React.FC = () => {
    return (
        <div className='absolute min-w-screen z-100 flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md text-center'>
                <IoCheckmarkDoneCircle className='w-16 h-16 text-green-500 mx-auto' />
                <h1 className='mt-4 mb-2 text-gray-800'>Thank You!</h1>
                <p className='text-gray-600 mb-6'>
                    Your payment was successful.<br />
                    We appreciate your purchase.
                </p>
            </div>
        </div>
    );
};

export default success;