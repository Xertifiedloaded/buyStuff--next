
'use client'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    closeSidebar,
    openSidebar,
    setLocation,
} from './ReduxStore';
import { BiMinus, BiPlus, BiTrash, BiX } from 'react-icons/bi';

import Paystack from '@/paystack-component/Paystack';
import { Location } from '@/utils/utils';

const getLocationPrice = (location) => {
    const locationObj = Location.find(loc => loc.exactLocation === location);
    return locationObj ? parseFloat(locationObj.price) : 0;
};

const Cart = () => {
    const cart = useSelector(state => state.cart.cart);
    const selectedLocation = useSelector(state => state.cart.selectedLocation);
    const dispatch = useDispatch();

    const isSidebarOpen = useSelector(state => state.sidebar.isOpen);
    const [isCheckout, setIsCheckout] = useState(false);

    const toggleSidebar = () => {
        if (isSidebarOpen) {
            dispatch(closeSidebar());
        } else {
            dispatch(openSidebar());
        }
    };

    const calculateTotalPrice = () => {
        const locationPrice = getLocationPrice(selectedLocation);
        const cartTotal = cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
        return (cartTotal + locationPrice).toFixed(2);
    };

    const handleCheckout = () => {
        setIsCheckout(true);
    };

    const handleBack = () => {
        setIsCheckout(false);
    };

    return (
        <div
            className={`cart fixed z-50 top-0 lg:w-[40%] xs:w-full overflow-hidden bg-[#f9f9f9] mx-auto p-[25px] right-0 h-full shadow-custom-shadow transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className={`cart__content transition-transform transform ${isCheckout ? '-translate-x-full' : 'translate-x-0'}`}>
                <div className='flex justify-between items-center'>
                    <h2 className='lg:text-2xl'>Cart</h2>
                    <BiX fontSize='30' onClick={toggleSidebar} />
                </div>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        <ul className="cart__items list-none p-0 mt-5">
                            {cart.map(item => (
                                <li key={item.productId} className="cart__item px-[15px] py-[2px] mb-[10px] shadow-custom rounded-sm">
                                    <div className="cart__info flex-grow">
                                        <div className='flex my-2 text-sm items-center justify-between'>
                                            <span className="cart__name lg:text-md font-700 text-[#444]">{item.productName}</span>
                                            <p>${item.productPrice.toFixed(2)}</p>
                                        </div>
                                        <span className="cart__price text-[#888] flex justify-between">
                                            <span>{item.quantity} Qty</span>
                                            <p>${(item.productPrice * item.quantity).toFixed(2)}</p>
                                        </span>
                                        <div className='flex justify-between items-center my-2'>
                                            <div className='flex gap-3 justify-end items-center my-2'>
                                                <BiPlus onClick={() => dispatch(increaseQuantity(item.productId))} />
                                                <BiMinus onClick={() => dispatch(decreaseQuantity(item.productId))} />
                                            </div>
                                            <BiTrash color='red' onClick={() => dispatch(removeFromCart(item.productId))} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h3 className='lg:text-2xl text-end font-700'>Total: ${calculateTotalPrice()}</h3>
                        <button
                            className="cart__order-button block transition-bg-color duration-300 ease hover:bg-blue-500 w-full p-[10px] mt-[10px] border-0 rounded-[4px] hover:bg-[#218838] cursor-pointer bg-[#28a745] text-white"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
            <div className={`payment__content transition-transform transform absolute top-0 left-0 w-full h-full bg-[#f9f9f9] p-[25px] ${isCheckout ? 'translate-x-0' : 'translate-x-full'}`}>
                <Paystack calculateTotalPrice={calculateTotalPrice} cart={cart} handleBack={handleBack} />
            </div>
        </div>
    );
};

export default Cart;