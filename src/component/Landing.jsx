import React from 'react'
import ProductCategoryList from './ProductCategory'
import Cart from '@/ReduxComponent/Cart'
import Header from './Header'

import ReuseableSectionGrid from './ReuseableSectionGrid'
import Button from './Button'

export default function Landing() {
  return (
    <>
      <Header />
      <ReuseableSectionGrid
        heroImg='/lingerie.jpeg'
        heroContent='lingerie'
        secondHeroImg='/lingerie.jpeg'
        styleContent=''
        content={<p>Hello Product</p>}
        btnContent={<Button styles='bg-black text-white w-[120px] rounded-lg text-xs h-[50px]' type='button' text='Shop Now' />}
      />
      <ProductCategoryList />
      <Cart />

    </>
  )
}
