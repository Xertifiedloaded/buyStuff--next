import React from "react"

import Category from "@/component/Category"

import OurProduct from "@/component/Our-Product"

import IconSection from "@/component/IconSection"

import FlashSaleCountdown from "@/component/CountDown"
import NewArrival from "@/NewArrival"

export default function LandingPage() {
    
  return (
    <main>
      <FlashSaleCountdown />
      <NewArrival />
      <Category />
      <OurProduct />
      <IconSection />
    </main>
  )
}
