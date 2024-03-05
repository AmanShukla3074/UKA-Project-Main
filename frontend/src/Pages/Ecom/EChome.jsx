import React from 'react'
import { Hero, ProductContainer } from '../../Components'
function EChome() {
  return (
    <div>
      <Hero/>
      <ProductContainer header="POPULAR PRODUCTS!"/>
      <ProductContainer category="hoodie" header="SHOP HOODIES!"/> 
    </div>
  )
}

export default EChome
