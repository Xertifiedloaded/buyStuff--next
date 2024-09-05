"use client";
import React from "react";
import { FaMouse } from "react-icons/fa";
import Logo from "../assets/hamburger.svg";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { PiBicycleThin } from "react-icons/pi";
import { closeSidebar, openSidebar } from "@/ReduxComponent/ReduxStore";
import GridCategory from "./GridCategory";
import HeroSection from "./Hero";

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
      <header className="bg-cover  bg-black text-white bg-center lg:h-screen min-h-[700px] hero">
        <nav className=" fixed flex items-center justify-between z-40 lg:px-10 px-4 py-5 top-0 left-0 w-full right-0 bg-black  mx-auto">
          <h1 className="logo font-700 text-2xl lg:text-2xl">Buy<span className="text-red-600">Stuff</span> </h1>
          <div className=" lg:hidden flex items-center gap-4 justify-end">
            <div className=" relative" onClick={toggleSidebar}>
              <CiShoppingCart className="font-700" fontSize="30px" />
              <small className="absolute  text-white font-700 left-[35%] top-[20%] ">
                {cart.length === 0 ? null : cart.length}
              </small>
            </div>
            <Image
              src={Logo}
              className="invert block object-cover lg:invert-0 lg:hidden"
              alt="none"
              width={20}
              height={20}
              objectFit="cover"
            />
          </div>

          <ul className="lg:flex hidden justify-end gap-4  items-center">
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

        <HeroSection />
      </header>

      <section className="wrapper">
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
