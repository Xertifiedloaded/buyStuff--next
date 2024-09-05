import React from "react"
import { BiShoppingBag } from "react-icons/bi"
import Link from "next/link"

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <BiShoppingBag size={100} className="text-gray-300 mb-6" />

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Your Cart is Empty
      </h2>
      <p className="text-gray-600 mb-6">
        Looks like you haven't added anything to your cart yet.
      </p>

      <Link
        href="/"
        className="bg-green-600 text-white px-6 py-3 rounded-md shadow hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default EmptyCart
