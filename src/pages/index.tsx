import { Routes, Route } from 'react-router-dom'

import { ProductsInfo } from './productsInfo'
import { ProductInformation } from './productInformation'

export const Pages = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<ProductsInfo />}/>
        <Route path='/products' element={<ProductInformation />}/>
      </Routes>
    </main>
  )
}
