
import Button from '@/component/Button'
import CloudinaryImage from '@/component/CloudinaryImage'
import { useApiContext } from '@/DashBoard/FetchContext'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function ProductTab({ toggleModal }) {
    const styleName = 'lg:w-[150px] xs:w[100px] lg:text-xs xs:text-xs bg-blue-500 outline-none bg-black text-white text-sm  px-3 lg:px-0 lg:py-3 py-2 mt-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
    const { product } = useApiContext()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const { openModal, handleDeleteProduct } = useApiContext()
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) {
                setIsError(true)
            }
        }, 300000)

        const fetchProducts = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000))
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
            }
        }
        fetchProducts()

        return () => clearTimeout(timer)
    }, [isLoading])

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-64'>
                <p>Loading products...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className='flex justify-center items-center h-64'>
                <p>Error loading products. Please try again later.</p>
            </div>
        )
    }

    return (
        <>
            <section className=" ">
                <div className="flex justify-end items-center mb-6">
                    <Button onclick={() => openModal('product')} text="Add New Product" styles="bg-blue-500 bg-black hover:bg-blue-600 text-black text-white py-2 px-4 rounded" type="button" />
                </div>

                <div className="products">
                    {product.length > 0 ? (
                        product.map((product, idx) => (
                            <div
                                key={idx}
                                className="grid lg:grid-cols-5 grid-cols-4 items-center transition-all duration-300 ease-in-out overflow-hidden gap-4 mb-4 bg-white rounded-lg shadow hover:shadow-lg p-4"
                            >
                                <div className="flex justify-center">
                                    <CloudinaryImage
                                        alt={product.productName}
                                        width="120"
                                        height="120"
                                        src={product.productImage}
                                        className="w-[100px] h-20 object-cover rounded"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-800 truncate">{product.productName}</h1>
                                </div>
                                <div className="xs:hidden lg:block">
                                    <p className="text-gray-600">{product.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-800 font-medium">${product.productPrice}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="hover:text-red-600 transition duration-150 ease-in-out">
                                        <FaTrash onClick={() => handleDeleteProduct(product._id)} color="currentColor" />
                                    </button>
                                    <button className="hover:text-blue-600 transition duration-150 ease-in-out">
                                        <FaEdit color="currentColor" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-gray-500 text-lg">No product available.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}