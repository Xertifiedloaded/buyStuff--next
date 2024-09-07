import React from "react"
import Today from "./Today"

export default function Timer({ days, hours, minutes, seconds }) {
  return (
    <>
      <section>
        <Today Today="Today" />
        <div className="lg:flex lg:items-start mt-6 gap-40">
          <h1 className="text-5xl font-700">Flash Sales</h1>

          <div className="flex space-x-4 gap-5 lg:justify-center lg:items-center  text-lg md:text-2xl font-semibold ">
            <div className="text-md flex justify-center items-center flex-col">
              <p className="text-xs md:text-2xl font-bold">{days}</p>
              <span className="text-xs ">Days</span>
            </div>
            <div className="text-md flex justify-center items-center flex-col">
              <p className="text-xs md:text-2xl font-bold">{hours}</p>
              <span className="text-xs">Hours</span>
            </div>
            <div className="text-md flex justify-center items-center flex-col">
              <p className="text-xs md:text-2xl font-bold">{minutes}</p>
              <span className="text-xs">Minutes</span>
            </div>
            <div className="text-md flex justify-center items-center flex-col">
              <p className="text-xs md:text-2xl font-bold">{seconds}</p>
              <span className="text-xs">Seconds</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
