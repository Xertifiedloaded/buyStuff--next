import React, { useEffect, useState } from "react"
import Today from "./component/Today"
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react"
import ProductData from "./component/ProductData"
import Swiper from "../src/component/Swiper";
export default function NewArrival() {
  const [newArrival, setNewArrival] = useState([])
  useEffect(() => {
    const fetchNewArrival = async () => {
      try {
        const response = await fetch("/api/products/newarrival")
        const data = await response.json()
        setNewArrival(data)
      } catch (error) {
        console.error("Error fetching flash sale products:", error)
      }
    }

    fetchNewArrival()
  }, [])
  return (
    <>
      <section className="wrapper">
        <div>
          <Today Today="New Arrival" />
          <h1 className="text-4xl">New Arrival</h1>
        </div>
        <div>
          {newArrival.length > 0 ? (
            <Swiper
              data={newArrival}
              slidesPerView={4}
              spaceBetween={30}
              renderItem={(product) => <ProductData {...product} />}
              nextButtonClass="arrival-slider-next"
              prevButtonClass="arrival-slider-prev"
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 30 },
              }}
            />
          ) : (
            <p>Loading flash sale products...</p>
          )}
          <div className="button-arrival flex justify-between lg:mt-2 items-center">
            <div className="transform w-full gap-4 flex justify-end items-center">
              <ChevronLeftCircle
                color="white"
                className="text-xs arrival-slider-next"
              />
              <ChevronRightCircle
                color="white"
                className="text-xs arrival-slider-prev"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
