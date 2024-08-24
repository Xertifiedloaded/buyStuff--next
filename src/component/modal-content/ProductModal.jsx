import React, { useState } from 'react';
import axios from 'axios';
import { useApiContext } from '@/DashBoard/FetchContext';

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
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            try {
                const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
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
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray mb-1">Product Name:</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border border-gray rounded-md p-2 w-full"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image:</label>
                <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="border text-xs border-gray rounded-md p-2 w-full"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block  text-sm font-medium text-gray-700 mb-1">Product Details:</label>
                <textarea
                    value={productDetails}
                    onChange={(e) => setProductDetails(e.target.value)}
                    className="border resize-none border-gray rounded-md p-2 w-full h-32"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Price:</label>
                <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="border border-gray rounded-md p-2 w-full"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray rounded-md p-2 w-full"
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
                className="bg-blue-500 bg-black text-sm text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
}