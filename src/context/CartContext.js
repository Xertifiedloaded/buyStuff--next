"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 })
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [loading, setLoading] = useState(true)
  const [cartLength, setLength] = useState(null)
  const [error, setError] = useState(null)
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const publicKey = "pk_test_8b18eabe74aaa47775d4f5bff93133d7d2fb078f"

  useEffect(() => {
    fetchCart()
    fetchLocations()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart/cart")
      if (!response.ok) {
        throw new Error("Failed to fetch cart")
      }
      const data = await response.json()
      setCart(data)
    setLength(data.items.length)
    } catch (error) {
      setError(error.message)
    }
  }

  const addToCart = async (productId) => {
    try {
      const response = await axios.post("/api/cart/cart", {
        productId,
        quantity: 1,
      })
      fetchCart()
      console.log(response)
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/location/location")
      if (!response.ok) {
        throw new Error("Failed to fetch locations")
      }
      const data = await response.json()
      setLocations(data)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

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

  // Handle location change
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value)
  }

  // Handle user input change
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPayload((prev) => ({ ...prev, [name]: value }))
  }

  // Calculate total price with selected location price
  const calculateTotalWithLocation = () => {
    const locationPrice =
      locations.find((loc) => loc.locationId === selectedLocation)?.price || 0
    return cart.totalPrice + locationPrice
  }

  // Handle payment success
  const handleSuccess = async () => {
    try {
      const response = await fetch("/api/cart/sendorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          address: payload.address,
          cartItems: cart.items.map((item) => ({
            productName: item.productId.productName,
            productPrice: item.productId.productPrice,
            quantity: item.quantity,
          })),
          totalPrice: calculateTotalWithLocation(),
        }),
      })
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to send order details")
      }
      alert("Thanks for doing business with us! Come back soon!!")
    } catch (error) {
      alert("Failed to send order details. Please try again.")
    }
  }

  // Payment component properties
  const componentProps = {
    email: payload.email,
    amount: calculateTotalWithLocation() * 100,
    metadata: {
      cartItems: cart.items.map((item) => ({
        productName: item.productId.productName,
        productPrice: item.productId.productPrice,
        quantity: item.quantity,
      })),
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: handleSuccess,
    onClose: () => alert("Wait! Don't leave "),
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        locations,
        selectedLocation,
        payload,
        loading,
        error,
        updateCartItem,
        removeFromCart,
        handleQuantityChange,
        handleLocationChange,
        handleInputChange,
        calculateTotalWithLocation,
        componentProps,
        fetchCart,
        addToCart,
        cartLength
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
