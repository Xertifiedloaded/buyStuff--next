"use client";
import React from "react";
import { FaMouse } from "react-icons/fa";
import Logo from "../assets/hamburger.svg";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { PiBicycleThin } from "react-icons/pi";
import { closeSidebar, openSidebar } from "@/ReduxComponent/ReduxStore";
import GridCategory from "./GridCategory";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const cart = useSelector((state) => state.cart.cart);
  const toggleSidebar = () => {
    if (isSidebarOpen) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };
  interface NavProps {
    path?: string;
    title: string;
    onClick?: () => void;
  }

  const NAV: NavProps[] = [
    { path: "/", title: "Home" },
    { title: "Cart", onClick: toggleSidebar },
    { path: "/about", title: "Checkout" },
  ];

  return (
    <>
      <header className="bg-cover  bg-black text-white bg-center lg:h-screen xs:min-h-[700px] hero">
        <nav className=" fixed z-40 lg:px-10 xs:px-4 py-4 top-0 left-0 w-full right-0 bg-black  mx-auto">
          <div className=" lg:hidden xs:flex items-center gap-4 justify-end">
            <div className=" relative" onClick={toggleSidebar}>
              <CiShoppingCart className="font-700" fontSize="30px" />
              <small className="absolute  text-white font-700 left-[35%] top-[20%] ">
                {cart.length === 0 ? null : cart.length}
              </small>
            </div>
            <img src={Logo} className="xs:invert xs:block lg:hidden" alt="" />
          </div>
          <ul className="lg:flex xs:hidden justify-end gap-4  items-center">
            {NAV.map((items, idx) => (
              <li
                key={idx}
                onClick={items.onClick}
                className="font-600 flex relative items-center"
              >
                <a href={items.path}>{items.title}</a>
                {items.title === "Cart" &&
                  (cart.length === 0 ? null : (
                    <span className="">
                      <div className="flex items-center">
                        <CiShoppingCart className="font-700" fontSize="20px" />
                        <p className="text-[10px]">{cart.length}</p>
                      </div>
                    </span>
                  ))}
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:w-[85%] xs:w-[95%] mx-auto">
          <div className="flex lg:h-[450px] border xs:min-h-[350px] border-black justify-center items-center">
            <div className="text-center">
              <h1 className="text-white xs:text-3xl lg:text-7xl font-bold">
                Welcome <span className="text-red-600 capitalize">to</span>{" "}
                BuyStuff
              </h1>
              <p className="mt-4 lg:text-2xl xs:text-xl">
                A taste you can't resist
              </p>
            </div>
          </div>
          <div className="flex justify-center my-6">
            <div className="h-[100px] border border-red-600 border-t-0 border-b-0 border-l-0" />
          </div>
          <div className="flex justify-center items-center">
            <h1 className="flex gap-2 justify-center items-center">
              <FaMouse />
              START ORDERING
            </h1>
          </div>
        </div>
      </header>

      <section className="w-[85%] mx-auto">
        <div className="flex text-md my-3 items-center gap-6">
          <MdLocationOn />
          <p>Inside Mobil Filling Station, Odo-Eran Obantoko • More</p>
        </div>
        <div className="flex my-3 text-md items-center gap-6">
          <CiClock1 />
          <p className="text-greenColor">
            Open for online orders until 8:00 pm
          </p>
        </div>
        <div className="flex my-3 text-md items-center gap-6">
          <PiBicycleThin />
          <p>1 hour delivery time</p>
        </div>

        <GridCategory />
      </section>
    </>
  );
};

export default Header;
