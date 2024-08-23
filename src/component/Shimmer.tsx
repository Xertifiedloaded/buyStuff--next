"use client";
import React, { useEffect, useState } from "react";

const Shimmer: React.FC = () => {
  return (
    <div className="  gap-4 grid lg:grid-cols-4 xs:grid-cols-1">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="shimmer-item bg-customBackgroundSize% 
        border-gray shadow-sm w-full h-[150px] 
        animate-shimmer  bg-shimmer-gradient rounded-[0.5rem]"
        />
      ))}
    </div>
  );
};

export default Shimmer;
