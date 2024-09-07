import { datum } from "@/utils"
import React from "react"
import Image from "next/image"
export default function IconSection() {
  return (
    <section className="wrapper flex lg:justify-around justify-between my-[100px] items-center">
      {datum.map((item, idx) => (
        <div key={idx} className="text-center lg:text-sm text-xs">
          <div className="flex items-center justify-center">
            <div className="bg-white lg:h-[50px] lg:w-[50px] w-[40px] h-[40px] rounded-full flex justify-center items-center">
              <Image
                className="lg:w-9 w-5 h-5 invert object-cover lg:h-9"
                src={item.icon}
                width={200}
                alt="icon"
                height={200}
              />
            </div>
          </div>
          <h1 className="font-bold my-4 text-xs lg:text-xl">{item.heading}</h1>
          <p className="text-xs">{item.para}</p>
        </div>
      ))}
    </section>
  )
}
