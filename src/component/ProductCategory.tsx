import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { addToCart, decreaseQuantity } from "../ReduxComponent/ReduxStore"
import { useApiContext } from "@/DashBoard/FetchContext"
import Shimmer from "./Shimmer"
import ReuseableSectionGrid from "./ReuseableSectionGrid"
import Image from "next/image"
import { BiMinus } from "react-icons/bi"
import { useCart } from "@/context/CartContext"

const ProductCategoryList: React.FC = () => {
  const { product } = useApiContext()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()
  useEffect(() => {
    if (product && product.length > 0) {
      setIsLoading(false)
    }
  }, [product])

  const categories = [...new Set(product.map((p) => p.category))]

  const styleName =
    "w-full bg-blue-500 text-black border border-black py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"

  return (
    <>
      <div className="product-category-list lg:w-[85%] wrapper">
        {isLoading ? (
          <Shimmer />
        ) : (
          categories.map((category) => (
            <section
              key={category}
              className="category-section capitalize text-black"
            >
              <h1 className="lg:text-5xl text-2xl text-white my-5 font-bold lg:my-10 uppercase">
                {category}
              </h1>

              <ul className="product-grid font-poppins flex flex-wrap gap-4">
                {product
                  .filter((p) => p.category === category)
                  .map((product) => (
                    <li
                      key={product.productId}
                      className="product-item text-white flex flex-col lg:flex-row lg:justify-between lg:gap-2 border border-[#222326] rounded-lg shadow-lg p-4 w-full lg:w-[48%] min-h-[130px]"
                    >
                      <div className="w-full lg:w-[40%] overflow-hidden rounded-sm mb-4 lg:mb-0">
                        <Image
                          width={200}
                          height={200}
                          alt="img"
                          className="object-cover w-full h-28"
                          src={product.productImage}
                        />
                      </div>
                      <div className="flex px-2 flex-col justify-between flex-1">
                        <div className="flex-1">
                          <h3 className="product-name text-sm font-semibold">
                            {product.productName}
                          </h3>

                          {product.productDetails && (
                            <p className="product-details py-2 lg:py-4 text-xs">
                              {product.productDetails}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <p className="product-price text-sm font-bold">
                            ₦{product.productPrice}
                          </p>
                          <button
                            onClick={() => addToCart(product._id)}
                            className="bg-white text-black w-6 h-6 hover:bg-gray transition-all duration-500 ease-linear rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </>
  )
}

export default ProductCategoryList
