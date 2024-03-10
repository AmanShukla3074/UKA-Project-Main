import React, { useEffect, useState } from 'react'
import { Hero, ProductContainer } from '../../Components'
import axios from 'axios';


function EChome() {
  
  return (
    <div>
      <Hero/>
      <ProductContainer header="POPULAR PRODUCTS!" />
      <ProductContainer category="hoodie" header="SHOP HOODIES!"/> 
    </div>
  )
}

export default EChome
