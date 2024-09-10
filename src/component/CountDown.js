'use client'
import React, { useEffect, useState } from "react"
import Countdown from "react-countdown"
import Swipe from "./Swipe"
import Timer from "./Timer"

const FlashSaleCountdown = () => {
  const [saleEndDate, setSaleEndDate] = useState(null);
  useEffect(() => {
    setSaleEndDate(new Date("2024-09-30T23:59:59"));
  }, []);

  if (!saleEndDate) {
    return null; 
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span className="text-red-500 text-xl font-bold">Flash Sale Ended!</span>
      );
    } else {
      return (
        <div className="w-full">
          <div className="mb-6">
            <Timer
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          </div>
          <Swipe />
        </div>
      );
    }
  };

  return (
    <div className="wrapper">
      <Countdown date={saleEndDate} renderer={renderer} />
    </div>
  );
};

export default FlashSaleCountdown;
