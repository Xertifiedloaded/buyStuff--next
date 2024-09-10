import { NAV } from "@/utils/Utilities"
import React from "react"
import { BiX } from "react-icons/bi"
import Link from "next/link"
export default function Nav({ handleToggle }) {
  return (
    <div className="inset-0 fixed lg:hidden  p-5 h-screen bg-black">
      <div className="flex justify-between text-center">
        <h1 className="text-2xl">BuyStuff</h1>
        <BiX onClick={handleToggle} fontSize="35px" />
      </div>
      <ul className="h-full grid place-items-center">
        <div className="text-center">
          {NAV.map((items, idx) => (
            <Link key={idx} className="my-8 text-2xl font-mulish font-500 block" href={items.title}>
                 {items.title}
            </Link>
          ))}
        </div>
      </ul>
    </div>
  )
}
