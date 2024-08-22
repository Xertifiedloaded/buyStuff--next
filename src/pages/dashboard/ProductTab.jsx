import React, { useState, useEffect } from 'react';
import Button from '@/component/Button';
import CloudinaryImage from '@/component/CloudinaryImage';
import { useApiContext } from '@/DashBoard/FetchContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Shimmer from '@/component/Shimmer';


export default function ProductTab() {
    const styleName = 'lg:w-[150px] xs:w[100px] lg:text-xs xs:text-xs bg-blue-500 outline-none bg-black text-white text-sm border border-black xs:px-3 lg:px-0 lg:py-3 xs:py-2 mt-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300';
    const { product } = useApiContext();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) {
                setIsError(true);
            }
        }, 300000); // 5 minutes

        const fetchProducts = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate data fetching
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setIsError(true);
            }
        };

        fetchProducts();
        return () => clearTimeout(timer);
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-64'>
                <Shimmer />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='flex justify-center items-center h-64'>
                <p>Error loading products. Please try again later.</p>
            </div>
        );
    }

    return (
        <>
            <section>
                <div className='flex justify-end items-center'>
                    <Button text='Add New Product' styles={styleName} type='button' />
                </div>
                <div className='products'>
                    {
                        product.length > 0 ? (
                            product.map((product, idx) => (
                                <div key={idx} className='grid xs:text-xs md:text-sm lg:grid-cols-5 xs:grid-cols-4 items-center transition-all px-4 duration-300 ease-in-out overflow-hidden gap-4 mt-4 bg-white rounded-xl shadow-md border border-white'>
                                    <div>
                                        <CloudinaryImage alt='image' width='500' height='100' src={product.productImage} style='lg:w-[120px] xs:w-[100px] xs:h-14 lg:h-16' />
                                    </div>
                                    <div className=''>
                                        <h1 className='text-black truncate font-600 capitalize'>{product.productName}</h1>
                                    </div>
                                    <div className='xs:hidden lg:block'>
                                        <p className='text-black font-600 capitalize'>{product.category}</p>
                                    </div>
                                    <div>
                                        <p className='text-black font-600 capitalize'>{product.productPrice}</p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <FaTrash color='red' />
                                        <FaEdit />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex justify-center items-center h-64'>
                                <p>No products available.</p>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    );
}