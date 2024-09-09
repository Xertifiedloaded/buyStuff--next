import React from "react"
import Image from "next/image"
import { FaPlus } from "react-icons/fa"

import axios from "axios"
import { useCart } from "@/context/CartContext"

export default function Button({ text, styles, type, onclick }) {
  return (
    <>
      <button onClick={onclick} type={type} className={styles}>
        {text}
      </button>
    </>
  )
}

// const addToCart = async (productId) => {
//   try {
//     const response = await axios.post("/api/cart/cart", {
//       productId,
//       quantity: 1,
//     })
//     console.log(response)

 
//   } catch (error) {
//     console.error("Error adding to cart:", error)
//   }
// }

export function Card({ product, handleAddToCart }) {
  const {addToCart}=useCart()
  return (
    <div className="shadow-md p-2 mt-4">
      <div className="w-full bg-gray  overflow-hidden rounded-sm mb-4 lg:mb-0">
        <Image
          width={200}
          height={200}
          alt="img"
          className="object-cover w-full h-44"
          src={product.productImage}
        />
      </div>
      <h1 className="my-4 capitalize font-bold"> {product.productName}</h1>
      <div className="flex justify-between items-center">
        <p className="my-2 font-400"> ₦{product.productPrice}</p>
        <div className="w-4 h-4 flex justify-center items-center rounded-full bg-black">
          <FaPlus
            // onClick={() => handleAddToCart(product)}
            onClick={() => addToCart(product._id)}
            color="white"
            fontSize="10px"
          />
        </div>
      </div>
    </div>
  )
}
