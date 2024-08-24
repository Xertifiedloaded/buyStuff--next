import React, { useState } from 'react';
import { useApiContext } from '@/DashBoard/FetchContext';
import { Inputs } from '../Input';

export default function LocationForm({ onClose }) {
    const [exactLocation, setExactLocation] = useState('');
    const [price, setPrice] = useState('');

    const { handleAddLocation, handleDelete } = useApiContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const locationData = {
            exactLocation,
            price
        };

        handleAddLocation(locationData);
        setExactLocation('');
        setPrice('');

    };

    return (
        <form onSubmit={handleSubmit}>
            <Inputs
                label='Exact Location'
                type="text"
                name='location'
                onChange={(e) => setExactLocation(e.target.value)}
                placeholder='Enter the exact location'
                value={exactLocation}
            />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price:</label>
                <input
                    type="number"
                    name='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="p-3 h-[45px] text-xs placeholder:text-black lg:placeholder:text-gray lg:placeholder:text-xs bg-transparent placeholder:text-sm text-[16px] rounded-md border lg:border-gray border-gray-dark w-full outline-none"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-sm bg-black text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
}