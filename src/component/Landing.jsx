import React from 'react'
import ProductCategoryList from './ProductCategory'
import Cart from '@/ReduxComponent/Cart'
import Header from './Header'
import Footer from './Footer'

export default function Landing() {
  return (
    <>
      <Header />
      <ProductCategoryList />
      <Cart />
      <Footer />
    </>
  )
}
