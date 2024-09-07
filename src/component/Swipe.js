import React, { useEffect, useState } from "react";
import Swiper from "../component/Swiper";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import ProductData from "./ProductData";
import { useApiContext } from "@/DashBoard/FetchContext"; 

export default function Swipe() {





  return (
    <div>
      <Swiper
        data={flashSaleProducts}
        slidesPerView={4}
        spaceBetween={30}
        renderItem={(product) => <ProductData {...product} />}
        nextButtonClass="product-slider-next"
        prevButtonClass="product-slider-prev"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
      />
      <div className="button-swiper flex justify-between lg:mt-2 items-center">
        <div className="transform w-full gap-4 flex justify-end items-center">
          <ChevronLeftCircle
            color="white"
            className="text-xs product-slider-prev"
          />
          <ChevronRightCircle
            color="white"
            className="text-xs product-slider-next"
          />
        </div>
      </div>
    </div>
  );
}
