import EmptyCart from "@/ReduxComponent/EmptyCart"
import { useState, useEffect } from "react"
import Link from "next/link"
const CartPage = () => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch cart data from the backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart/cart")
        if (!response.ok) {
          throw new Error("Failed to fetch cart")
        }
        const data = await response.json()
        setCart(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  // Update cart item quantity
  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await fetch("/api/cart/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      })
      if (!response.ok) {
        throw new Error("Failed to update cart item")
      }
      const updatedCart = await response.json()
      setCart(updatedCart)
    } catch (error) {
      setError(error.message)
    }
  }

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch("/api/cart/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      })
      if (!response.ok) {
        throw new Error("Failed to remove item from cart")
      }
      const updatedCart = await response.json()
      setCart(updatedCart)
    } catch (error) {
      setError(error.message)
    }
  }

  // Handle quantity change
  const handleQuantityChange = (productId, change) => {
    const item = cart.items.find((item) => item.productId._id === productId)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change)
      updateCartItem(productId, newQuantity)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.items.length > 0 ? (
        cart.items.map((item) => (
          <div
            key={item.productId._id}
            className="border p-4 mb-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">
              {item.productId.productName}
            </h2>
            <p className="text-lg">
              Price: ${item.productId.productPrice.toFixed(2)}
            </p>
            <div className="flex items-center mt-2">
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
                className=" bg-transparent    p-2 text-center w-16"
              />
              <button
                onClick={() => handleQuantityChange(item.productId._id, 1)}
                className="bg-blue-500 text-white p-2 rounded-r"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="bg-red-500 text-white p-2 ml-4 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>
          <EmptyCart />
        </p>
      )}
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
    </div>
  )
}

export default CartPage
