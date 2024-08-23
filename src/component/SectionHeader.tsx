import React from 'react'
import { Fraunces, Manrope } from 'next/font/google'

const fraunces = Fraunces({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin-ext'],
  display: 'optional',
})
const manrope = Manrope({
  weight: ['200', '300', '400', '600', '700', '800'],
  subsets: ['latin'],
})

const SectionHeader = ({ heading, paragraph, HeadinStyle, paragraphStyle }) => {
  return (
    <div>
      <div>
        <p className={`${manrope.className} ${HeadinStyle}`}>{heading}</p>
        <h1 className={`${fraunces.className} ${paragraphStyle}`}>{paragraph}</h1>
      </div>
    </div>
  )
}

export default SectionHeader
