'use client'
import React from "react"
import Countdown from "react-countdown"
import Swipe from "./Swipe"
import Timer from "./Timer"
import Button from "./Button"
import FlashSaleProducts from "./FlashSalesProduct"

const saleEndDate = new Date("2024-09-30T23:59:59")

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <span className="text-red-500 text-xl font-bold">Flash Sale Ended!</span>
    )
  } else {
    return (
      <div className="w-full ">
        <div className="mb-6">
          <Timer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        </div>

     
        <div className="text-center ">
          <Button
            styles="bg-[#DB4444] text-white rounded-sm text-xs px-6 font-bold py-3"
            text="View All Products"
          />
        </div>
      </div>
    )
  }
}

export default function FlashSaleCountdown() {
  return (
    <div className="wrapper ">
      <Countdown date={saleEndDate} renderer={renderer} />

    </div>
  )
}
