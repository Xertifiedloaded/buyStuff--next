"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
const publicKey = "pk_test_8b18eabe74aaa47775d4f5bff93133d7d2fb078f"
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 })
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [loading, setLoading] = useState(true)
  const [cartLength, setLength] = useState(null)
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [error, setError] = useState(null)
  const [loadingProductIds, setLoadingProductIds] = useState(new Set());
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    fetchCart()
    fetchLocations()
  }, [])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/cart/cart")
      if (!response.ok) {
        throw new Error("Failed to fetch cart")
      }
      const data = await response.json()
      setCart(data)
      if (data.items.length > 0) {
        setLength(data.items.length)
      } else {
        setLength(null)
      }
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const addToCart = async (productId) => {
    try {
      const response = await axios.post("/api/cart/cart", {
        productId,
        quantity: 1,
      });
      const productResponse = await fetch(`/api/cart/${productId}`);
      if (!productResponse.ok) {
        throw new Error("Failed to fetch product details");
      }
      fetchCart();
      const product = await productResponse.json();
      toast.success(`Added ${product.productName} to cart`);
    } catch (error) {
      toast.error("Error adding to cart");
      console.error("Error adding to cart:", error);
    } finally {

    }
  };

  const fetchLocations = async () => {
    setLoading(true)
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

  const removeFromCart = async (productId) => {
    try {
      const productResponse = await fetch(`/api/cart/${productId}`)
      if (!productResponse.ok) {
        throw new Error("Failed to fetch product details")
      }
      const product = await productResponse.json()
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
      toast.success(`Removed ${product.productName} from cart`)
    } catch (error) {
      toast.error("Error removing item from cart")
      console.error("Error removing item from cart:", error)
    }
  }

  const clearCart = async () => {
    try {
      const response = await axios.post("/api/cart/clear-cart")
      if (response.status === 200) {
        toast.success("Cart cleared successfully")
        fetchCart()
      }
    } catch (error) {
      toast.error("Error clearing cart")
      console.error("Error clearing cart:", error)
    }
  }

  const handleQuantityChange = (productId, change) => {
    const item = cart.items.find((item) => item.productId._id === productId)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change)
      updateCartItem(productId, newQuantity)
    }
  }

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPayload((prev) => ({ ...prev, [name]: value }))
  }

  const calculateTotalWithLocation = () => {
    const locationPrice =
      locations.find((loc) => loc.locationId === selectedLocation)?.price || 0
    return cart.totalPrice + locationPrice
  }

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
      clearCart()
      if (!response.ok) {
        throw new Error("Failed to send order details")
      }
      toast.success("Thanks for doing business with us! Come back soon!!")
    } catch (error) {
      toast.error("Failed to send order details. Please try again.")
    }
  }

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
    onClose: () => toast.info("Wait! Don't leave "),
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
        cartLength,
        clearCart,
        
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
