"use client"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  closeSidebar,
  openSidebar,
  setLocation,
} from "./ReduxStore"
import { BiMinus, BiPlus, BiTrash, BiX } from "react-icons/bi"



import EmptyCart from "./EmptyCart"
import Paystack from "@/paystack-component/Paystack"

const getLocationPrice = (location) => {
  const locationObj = Location.find((loc) => loc.exactLocation === location)
  return locationObj ? parseFloat(locationObj.price) : 0
}

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen)
  const [isCheckout, setIsCheckout] = useState(false)

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      dispatch(closeSidebar())
    } else {
      dispatch(openSidebar())
    }
  }

  const calculateTotalPrice = () => {
    const cartTotal = cart.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    )
    return cartTotal.toFixed(2)
  }

  const handleCheckout = () => {
    setIsCheckout(true)
  }

  const handleBack = () => {
    setIsCheckout(false)
  }

  return (
    <div
      className={`cart capitalize fixed z-50 top-0 lg:w-[40%] w-full text-white overflow-hidden bg-[#232527] mx-auto p-[25px] right-0 h-full shadow-custom-shadow transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="">
        <div
          className={`cart__content text-white  transition-transform transform ${
            isCheckout ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="flex justify-between  overflow-hidden items-center">
            <h2 className="text-2xl font-bold">Cart</h2>
            <BiX fontSize="30" onClick={toggleSidebar} />
          </div>
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div>
              <ul className="cart__items max-h-[645px] overflow-y-auto space-y-5 mt-5">
                {cart
                  .slice()
                  .reverse()
                  .map((item) => (
                    <li
                      key={item.productId}
                      className="cart__item p-4 shadow-md rounded-lg bg-gray-50"
                    >
                      <div className="cart__info">
                        <div className="flex items-center justify-between mb-2">
                          <span className="cart__name text-lg font-semibold text-gray-800">
                            {item.productName}
                          </span>
                          <p className="text-gray-700">
                            ${item.productPrice.toFixed(2)}
                          </p>
                        </div>
                        <div className="cart__price text-sm text-gray-500 flex justify-between items-center mb-2">
                          <span>{item.quantity} Qty</span>
                          <p>
                            ${(item.productPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                dispatch(increaseQuantity(item.productId))
                              }
                              className="h-4 w-4 rounded-full  bg-green-500 text-white  hover:bg-green-600 transition duration-300"
                              aria-label="Increase quantity"
                            >
                              <BiPlus />
                            </button>
                            <button
                              onClick={() =>
                                dispatch(decreaseQuantity(item.productId))
                              }
                              className="h-4 w-4 rounded-full  bg-red-500 text-white  hover:bg-red-600 transition duration-300"
                              aria-label="Decrease quantity"
                            >
                              <BiMinus />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              dispatch(removeFromCart(item.productId))
                            }
                            className="h-5 flex justify-center items-center  w-5 rounded-full  text-white  hover:bg-red-600 transition duration-300"
                            aria-label="Remove from cart"
                          >
                            <BiTrash />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="mt-6 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  Total: ${calculateTotalPrice()}
                </h3>
                <button
                  className="cart__order-button bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          className={`payment__content transition-transform transform absolute top-0 left-0 w-full h-full bg-[#232527] p-[25px] ${
            isCheckout ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Paystack
            calculateTotalPrice={calculateTotalPrice}
            cart={cart}
            handleBack={handleBack}
          />
        </div>
      </div>
    </div>
  )
}

export default Cart
