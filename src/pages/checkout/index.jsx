import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useCart } from "@/context/CartContext";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  {
    ssr: false,
  }
)
const CheckoutPage = () => {
    const {
        cart,
        locations,
        selectedLocation,
        payload,
        loading,
        error,
        handleLocationChange,
        handleInputChange,
        componentProps,
        calculateTotalWithLocation,
      } = useCart();
    
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="w-[95%] flex mt-[100px]  flex-col lg:flex-row mx-auto gap-4 p-4">
      <div className="bg-black  flex-1 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cart.items.length > 0 ? (
          cart.items.map((item) => (
            <div key={item.productId._id} className="border-b py-4">
              <h3 className="text-lg capitalize font-semibold">
                {item.productId.productName}
              </h3>
              <p className="text-sm mt-1">
                Price: ${item.productId.productPrice.toFixed(2)}
              </p>
              <p className="text-sm mt-1">Quantity: {item.quantity}</p>
            </div>
          ))
        ) : (
          <p className="text-lg">Your cart is empty.</p>
        )}
        <h3 className="text-2xl font-semibold mt-6">
          Total Price: ${calculateTotalWithLocation().toFixed(2)}
        </h3>
      </div>

      <section className="flex-1 bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="location" className="block text-lg font-medium mb-2">
            Select Location
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.locationId} value={loc.locationId}>
                {loc.exactLocation} - ${loc.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={payload.name}
            onChange={handleInputChange}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={payload.email}
            onChange={handleInputChange}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-lg font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={payload.phone}
            onChange={handleInputChange}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="address" className="block text-lg font-medium mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={payload.address}
            onChange={handleInputChange}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <PaystackButton
          className="block transition-colors duration-300 ease-in-out hover:bg-green-700 w-full p-3 mt-4 border-0 rounded-lg bg-[#28a745] text-white"
          {...componentProps}
        />
      </section>
    </div>
  )
}

export default CheckoutPage
