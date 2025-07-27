import React from 'react';
import { IoCloseCircle } from "react-icons/io5";
const cancel: React.FC = () => {
    return (
        <div className='absolute min-w-screen z-100 flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md text-center'>
                <IoCloseCircle className='w-16 h-16 text-red-500 mx-auto' />
                <h1 className='mt-4 mb-2 text-gray-800'>Payment Cancelled</h1>
                <p className='text-gray-600 mb-6'>
                    Your payment was cancelled.<br />
                    If you have any questions, please contact support.
                </p>
            </div>
        </div>
    );
};

export default cancel;