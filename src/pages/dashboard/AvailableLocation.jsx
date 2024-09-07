
import React, { useState, useEffect } from 'react';
import Button from '@/component/Button';
import { useApiContext } from '@/DashBoard/FetchContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function AvailableLocation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { locationData, openModal, handleDelete } = useApiContext();
  const styleName = 'lg:w-[150px] xs:w[100px] lg:text-xs xs:text-xs bg-blue-500 outline-none bg-black text-white text-sm  xs:px-3 lg:px-0 lg:py-3 xs:py-2 mt-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300';

  useEffect(() => {
    if (!locationData) {
      setError('Error fetching location data.');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [locationData]);

  return (
    <>
      <section className="max-w-7xl mx-auto text-black ">
        <div className="flex justify-end items-center mb-6">
          <Button onclick={() => openModal('location')} text="Add New Product" styles="bg-blue-500 bg-white text-black hover:bg-blue-600 text-black text-xs py-2 px-4 rounded" type="button" />
        </div>
        {loading ? (
          <div className="text-center text-black text-lg font-medium py-10">
            Loading locations...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg font-medium py-10">
            {error}
          </div>
        ) : (
          <div className="grid gap-6">
            {locationData.map((location, idx) => (
              <div
                key={idx}
                className="grid text-xs md:text-sm lg:grid-cols-5 xs:grid-cols-4 items-center transition-all duration-300 ease-in-out p-8 bg-white rounded-lg shadow-md hover:shadow-lg "
              >

                <div>
                  <h1 className="text-lg font-semibold text-gray-800 truncate capitalize">
                    {location.exactLocation}
                  </h1>
                </div>

                <div>
                  <p className="text-md font-medium text-gray-700">
                    ${location.price}
                  </p>
                </div>


                <div className="flex items-center gap-3">
                  <button className="hover:text-red-600 transition duration-150 ease-in-out">
                    <FaTrash onClick={() => handleDelete(location._id)} />
                  </button>
                  <button className="hover:text-blue-600 transition duration-150 ease-in-out">
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
