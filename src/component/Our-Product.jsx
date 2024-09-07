import React, { useEffect, useState } from "react"
import Today from "./Today"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { addToCart } from "../ReduxComponent/ReduxStore"
import { useApiContext } from "@/DashBoard/FetchContext"
import Button, { Card } from "./Button"
import { useRouter } from 'next/router'

export default function OurProduct() {
  const { product } = useApiContext()
  const dispatch = useDispatch()
  const router = useRouter() // Import and initialize useRouter
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (product && product.length > 0) {
      setIsLoading(false)
    }
  }, [product])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    toast.success(`${product.productName} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: "1rem",
        borderRadius: 0,
      },
    })
  }

  const handleViewAllProducts = () => {
    router.push('/products')
  }

  return (
    <>
      <section className="wrapper lg:mt-[100px]">
        <Today Today="Our Products" />
        <h1 className="text-3xl mt-2">Explore Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-3  lg:grid-cols-3 xl:grid-cols-4">
          {product.slice(0, 8).map((product) => (
            <Card
              key={product.productId}
              handleAddToCart={handleAddToCart}
              product={product}
            />
          ))}
        </div>
        <div className="text-center mt-6">
        <button
            type="button"
            className="bg-[#DB4444] text-white rounded-md text-sm px-8 py-3 font-bold hover:bg-[#c63c3c] transition-colors duration-300"
            onClick={handleViewAllProducts}
          >
            View All Products
          </button>
        </div>
      </section>
    </>
  )
}
