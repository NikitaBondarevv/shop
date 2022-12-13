import { NumberOfProductsAndCategories } from '../numberOfProductsAndCategories'
import { ProductInformation } from '../productInformation'
import { getCategories } from '../contracts/getCategories'
import styles from './styles.css'
import { useEffect, useState } from 'react'

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
      <NumberOfProductsAndCategories name="Nikita" products={products} />
      <ProductInformation />
    </main>
  )
}
