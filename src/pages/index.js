import dynamic from "next/dynamic"
import Head from "next/head"
import React from "react"
import Banner from "@/component/HeroSection"
import Swipe from "@/component/Swipe"
import Category from "@/component/Category"
import Header from "@/component/Header"
import OurProduct from "@/component/Our-Product"
import Footer from "@/component/Footer"
import IconSection from "@/component/IconSection"
import FlashSaleProducts from "@/component/FlashSalesProduct"
import FlashSaleCountdown from "@/component/CountDown"

export default function Home() {
  return (
    <>
      <Head>
        <title>BuyStuff</title>
        <meta name="description" content="The Future Workforce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <main>
        <FlashSaleCountdown />
        <Category />
        <OurProduct />
        <IconSection />
      </main>
    </>
  )
}
