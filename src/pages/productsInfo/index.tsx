import { useEffect, useState } from 'react'

import { getCategories } from 'contracts/getCategories'
import styles from './styles.css'
import { IData } from 'interfaces/IData'

export const ProductsInfo = () => {
  const [products, setProducts] = useState<IData>({})

  useEffect(() => {
    const getData = async () => {
      setProducts(await getCategories())
    }

    getData()
  }, [])
  
  return (
  <div className={styles.productsInfo}>
    <span className={styles.greetings}>
      Hello,
    </span>
    <div className={styles.info}>
      <p>
        You have <mark>{products.categories}</mark> categories
        (<mark>{products.publishedCategories}</mark> published)
      </p>
      <p>
        You have <mark>{products.products}</mark> products
      </p>
    </div>
    <a className={styles.categories} href="#">Go to categories</a>
  </div>
)}
