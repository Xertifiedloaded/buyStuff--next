"use client"
import React, { useEffect, useState } from "react"
import { FaMouse } from "react-icons/fa"
import Logo from "../assets/hamburger.svg"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import Link from "next/link"
import { CiShoppingCart } from "react-icons/ci"
import { MdLocationOn } from "react-icons/md"
import { CiClock1 } from "react-icons/ci"
import { PiBicycleThin } from "react-icons/pi"
import { closeSidebar, openSidebar } from "@/ReduxComponent/ReduxStore"
import GridCategory from "./GridCategory"
import HeroSection from "./Hero"
import Cart from "@/ReduxComponent/Cart"
import { useCart } from "@/context/CartContext"

const Header: React.FC = () => {
  const { cart, cartLength } = useCart()
  interface NavProps {
    path?: string
    title: string
  }

  const NAV: NavProps[] = [
    { path: "/", title: "Home" },
    { title: "Cart", path: "/cart" },
    { path: "/checkout", title: "Checkout" },
  ]

  return (
    <>
      <header className="">
        <nav className=" fixed flex bg-black text-white items-center justify-between z-40 lg:px-10 px-4 py-5 top-0 left-0 w-full right-0   mx-auto">
          <h1 className="logo font-700 text-2xl lg:text-2xl">
            <Link href="/">
              Buy<span className="text-red-600">Stuff</span>
            </Link>
          </h1>
          <div className=" lg:hidden flex items-center gap-4 justify-end">
            <div className=" relative">
              <Link href="/cart">
                <CiShoppingCart className="font-700" fontSize="30px" />
              </Link>
              <small className="absolute  text-white font-700 left-[35%] top-[20%] ">
                {cartLength}
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
                        <Link href="/cart">
                          <CiShoppingCart
                            className="font-700"
                            fontSize="20px"
                          />
                        </Link>
                        <p className="text-[10px]">{cartLength}</p>
                      </div>
                    </span>
                  ))}
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
