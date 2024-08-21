import Button from '@/component/Button'
import { useApiContext } from '@/DashBoard/FetchContext'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
export default function AvailableLocation() {
  const styleName = 'lg:w-[150px] xs:w[100px] lg:text-xs xs:text-xs bg-blue-500 outline-none bg-black text-white text-sm border border-black xs:px-3 lg:px-0 lg:py-3 xs:py-2 mt-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
  const { locationData } = useApiContext()
  return (
    <>
      <section>
        <div className='flex justify-end items-center'>
          <Button text='Add New Product' styles={styleName} type='button' />
        </div>
        <div className='products'>
          {
            locationData.map((product, idx) => {
              return (
                <div key={idx} className='grid  xs:text-xs md:text-sm lg:grid-cols-5 xs:grid-cols-4 items-center transition-all p-6 duration-300 ease-in-out overflow-hidden gap-4 mt-4  bg-white rounded-xl shadow-md border border-white'>
                  <div className=''>
                    <h1 className='text-black truncate font-600 capitalize'>{product.exactLocation}</h1>
                  </div>
                  <div className=''>
                    <p className='text-black font-600 capitalize'>{product.price}</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FaTrash color='red' />
                    <FaEdit />
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}
