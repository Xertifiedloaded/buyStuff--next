import React from "react"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { useApiContext } from "@/DashBoard/FetchContext"

const poppin = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})
export default function ProductData({
  productImage,
  productName,
  productDetails,
  productPrice,
  productId
}) {

  return (
    <>
      <div className={`${poppin.className}   rounded-sm shadow-sm text-b`}>
        <div >
          <Image
            src={productImage}
            width={200}
            height={200}
            alt="img"
            className="object-cover w-full h-44"
          />
        </div>
        <div className="my-2 p-2">
          <h1 className="text-sm font-medium">{productName}</h1>
          <p className="text-xs my-2">{productDetails}</p>
          <h2 className="text-sm font-medium">${productPrice}</h2>
        </div>
      </div>
    </>
  )
}
