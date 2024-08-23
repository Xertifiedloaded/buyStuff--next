import React, { useState } from 'react';
import axios from 'axios';
import { useApiContext } from '@/DashBoard/FetchContext';
import { Inputs } from '../Input';
const CLOUDINARY_UPLOAD_PRESET = 'iboyi7t9';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/dpn9svwqm/image/upload`;

const categories = [
    { label: "Panties", value: "Panties" },
    { label: "Brallets", value: "Brallets" },
    { label: "Shorts", value: "Shorts" },
    { label: "Bra", value: "Bra" },
    { label: "Night Wears", value: "Night Wears" },
    { label: "Boxers", value: "Boxers" }
];

export default function ProductForm({ onClose }) {
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productDetails, setProductDetails] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { handleAddProduct } = useApiContext()
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

            try {
                const response = await axios.post(process.env.CLOUDINARY_UPLOAD_URL, formData);
                setImageUrl(response.data.secure_url);
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            productName,
            productImage: imageUrl,
            productDetails,
            productPrice,
            category
        };

        handleAddProduct(productData)
    };

    return (
        <form onSubmit={handleSubmit}>
            <Inputs
                label='Product Name'
                name='name'
                onChange={(e) => setProductName(e.target.value)}
                placeholder='Enter the new Product name'
                value={productName}
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image:</label>
                <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className=" p-3 h-[45px] text-xs  placeholder:text-black lg:placeholder:text-gray lg:placeholder:text-xs bg-transparent placeholder:text-sm text-[16px] rounded-md border lg:border-gray border-gray-dark w-full outline-none"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Details:</label>
                <textarea
                    value={productDetails}
                    onChange={(e) => setProductDetails(e.target.value)}
                    className="p-3 h-32  resize-none  placeholder:text-black lg:placeholder:text-gray lg:placeholder:text-xs bg-transparent placeholder:text-sm text-[16px] rounded-md border lg:border-gray border-gray-dark w-full outline-none"
                />
            </div>

            <Inputs
                label='Product Price'
                name='name'
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder='Enter the new Product name'
                value={productPrice}
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className=" h-[45px] text-xs  placeholder:text-black lg:placeholder:text-gray lg:placeholder:text-xs bg-transparent placeholder:text-sm text-[16px] rounded-md border lg:border-gray border-gray-dark w-full outline-none"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="bg-blue-500  bg-black text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
}