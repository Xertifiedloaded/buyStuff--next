"use client"
import EmptyCart from "@/ReduxComponent/EmptyCart"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import ClearCartButton from "@/component/ClearCart"
import { FaTrash } from "react-icons/fa"

const CartPage = () => {
  const { cart, loading, error, removeFromCart, handleQuantityChange } =
    useCart()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="w-[95%] mt-20 mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <ClearCartButton />
      </div>
      {cart.items.length > 0 ? (
        <>
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className=" border border-gray-dark p-4 mb-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl capitalize font-semibold">
                {item.productId.productName}
              </h2>
              <p className="text-lg">
                Price: ${item.productId.productPrice.toFixed(2)}
              </p>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <button
                    onClick={() => handleQuantityChange(item.productId._id, -1)}
                    className="bg-blue-500 text-white p-2 rounded-l"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    readOnly
                    className=" bg-transparent p-2 text-center w-16"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.productId._id, 1)}
                    className="bg-blue-500 text-white p-2 rounded-r"
                  >
                    +
                  </button>
                </div>
                <FaTrash onClick={() => removeFromCart(item.productId._id)} />
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mt-4">
              Total Price: ${cart.totalPrice.toFixed(2)}
            </h3>

            <Link href="/checkout">
              <button className="bg-green-400 px-8 h-10 rounded-md text-xs">
                Checkout
              </button>
            </Link>
          </div>
        </>
      ) : (
        <p>
          <EmptyCart />
        </p>
      )}
    </div>
  )
}

export default CartPage
