import React, { Suspense } from "react"

import Category from "@/component/Category"

import OurProduct from "@/component/Our-Product"

import IconSection from "@/component/IconSection"

import FlashSaleCountdown from "@/component/CountDown"
import NewArrival from "@/NewArrival"
import Loading from "@/component/Loading"

export default function LandingPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <FlashSaleCountdown />
        <NewArrival />
        <Category />
        <OurProduct />
        <IconSection />
      </Suspense>
    </main>
  )
}
