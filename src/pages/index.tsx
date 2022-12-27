import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { ProductsInfo } from './productsInfo'
import { ProductInformation } from './productInformation'
import { getCategories } from 'contracts/getCategories'

export const Pages = () => {
  const [products, setProducts] = useState({})

  useEffect(() => {
    const getData = async () => {
      setProducts(await getCategories())
    }

    getData()
  }, [])

  return (
    <main>
      <Routes>
        <Route path='/' element={<ProductsInfo name="Nikita" products={products} />}/>
        <Route path='/products' element={<ProductInformation />}/>
      </Routes>
    </main>
  )
}
