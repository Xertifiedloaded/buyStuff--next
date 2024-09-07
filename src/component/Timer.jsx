import React from "react"
import Today from "./Today"

const Timer = ({ days, hours, minutes, seconds }) => (
  <section className="flex flex-col lg:flex-row lg:justify-between  lg:items-center gap-2 lg:gap-12  lg:my-10">
    <div>
      <Today Today="Today" />
      <h1 className="text-3xl lg:text-4xl"> FlashSales</h1>
    </div>
    <div className="flex lg:justify-center items-center space-x-4">
      <div className="text-center">
        <div className="text-3xl font-bold">{days}</div>
        <div className="text-xs">Days</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold">{hours}</div>
        <div className="text-xs">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold">{minutes}</div>
        <div className="text-xs">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold">{seconds}</div>
        <div className="text-xs">Seconds</div>
      </div>
    </div>
  </section>
)

export default Timer
