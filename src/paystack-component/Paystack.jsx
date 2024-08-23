import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import { BiLeftArrowCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../ReduxComponent/ReduxStore";
import LocationChanges, { DeliveryInformation } from "../ReduxComponent/PriceCalculations";
import { Location } from "@/utils/utils";
import { useApiContext } from '@/DashBoard/FetchContext';
import { sendOrderDetails } from './OrderDetails';
// Dynamically import the PaystackButton component with no SSR
const PaystackButton = dynamic(() => import("react-paystack").then(module => module.PaystackButton), { ssr: false });

const Paystack = ({ handleBack, cart }) => {
    const { locationData } = useApiContext()
    // const publicKey = "pk_live_cfd6fa1002edc4e0ef555dd555ab7933c6a1aa10";
    const publicKey = "pk_test_8b18eabe74aaa47775d4f5bff93133d7d2fb078f";
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const selectedLocation = useSelector((state) => state.cart.selectedLocation);
    const locationPrice = useSelector((state) => state.cart.locationPrice);
    const [payload, setPayload] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [locationPrice, cart]);

    const handleLocationChange = (e) => {
        const selectedLocation = locationData.find(loc => loc.exactLocation === e.target.value);
        if (selectedLocation) {
            dispatch(setLocation(selectedLocation));
        }
    };

    const calculateTotalPrice = () => {
        const productsTotal = cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
        return productsTotal + locationPrice;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    // paystack
    const componentProps = {
        email: payload.email,
        amount: totalPrice * 100,
        metadata: {
            cartItems: cart.map(item => ({
                productName: item.productName,
                productPrice: item.productPrice,
                quantity: item.quantity,
            })),
            name: payload.name,
            phone: payload.phone,
            address: payload.address
        },
        publicKey,
        text: "Pay Now",
        onSuccess: async () => {
            await sendOrderDetails(cart, payload)
            console.log(payload, cart);

            alert("Thanks for doing business with us! Come back soon!!")
        },
        onClose: () => alert("Wait! Don't leave "),
    };

    return (
        <section className="">
            <div className="flex justify-between items-center">
                <BiLeftArrowCircle fontSize={25} onClick={handleBack} />
                <h1 className="lg:text-lg">Checkout</h1>
            </div>
            <div className="orders">
                {cart.map((item, idx) => (
                    <div key={idx} className="flex my-2 justify-between">
                        <p>{item.productName} x {item.quantity}</p>
                        <p>₦{(item.productPrice * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <h3>Total: ₦{totalPrice.toFixed(2)}</h3>
            </div>

            <form>
                <h3>Delivery Details</h3>
                {DeliveryInformation(payload, handleChange)}
                {LocationChanges(handleLocationChange, payload, handleChange)}
            </form>
            <PaystackButton
                className="cart__order-button block transition-bg-color duration-300 ease hover:bg-blue-500 w-full p-[10px] mt-[10px] border-0 rounded-[4px] hover:bg-[#218838] cursor-pointer bg-[#28a745] text-white"
                {...componentProps}
            />
        </section>
    );
};

export default Paystack;