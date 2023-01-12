import { useContext, useEffect, useState } from 'react'

import { IProductInfo } from 'interfaces/IProductInfo'
import { UserContext } from 'contexts/userContext'
import { getCategories } from 'contracts/getCategories'
import styles from './styles.css'
import { Link } from 'react-router-dom'

export const ProductsInfo = () => {
  const [products, setProducts] = useState<IProductInfo>({} as IProductInfo)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getData = async () => {
      setProducts(await getCategories())
    }

    getData()
  }, [])
  
  return (
  <div className={styles.productsInfo}>
    <span className={styles.greetings}>
      Hello, {user?.firstName}
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
    <Link className={styles.categories} to="/categories">Go to categories</Link>
  </div>
)}
