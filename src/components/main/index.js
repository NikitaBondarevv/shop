import { useEffect, useState } from 'react'

import { ProductsInfo } from '../productsInfo'
import { ProductInformation } from '../productInformation'
import { getCategories } from '../../contracts/getCategories'
import styles from './styles.css'

export const Main = () => {
  const [products, setProducts] = useState({})

  useEffect(() => {
    const getData = async () => {
      setProducts(await getCategories())
    }

    getData()
  }, [])

  return (
    <main className={styles.main}>
      <ProductsInfo name="Nikita" products={products} />
      <ProductInformation />
    </main>
  )
}
