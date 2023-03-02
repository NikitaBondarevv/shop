import { useContext, useEffect, useState } from 'react'

import { IProductInfo } from 'interfaces/IProductInfo'
import { UserContext } from 'contexts/userContext'
import { getGeneralInfo } from 'contracts/getGeneralInfo'
import styles from './styles.css'
import { Link } from 'react-router-dom'
import { Preloader } from 'components/preloader'

export const ProductsInfo = () => {
  const [isLoading, setIsloading] = useState(false)
  const [products, setProducts] = useState<IProductInfo>()
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getData = async () => {
      setIsloading(true)

      try {
        setProducts(await getGeneralInfo())
      } finally {
        setIsloading(false)
      }
    }

    getData()
  }, [])

  return (
    isLoading
      ? <Preloader />
      : (
        <>
          <span className={styles.greetings}>
            Hello, {user?.firstName}
          </span>
          <div className={styles.info}>
            <p>
              You have <mark>{products?.categories}</mark> categories
              (<mark>{products?.publishedCategories}</mark> published)
            </p>
            <p>
              You have <mark>{products?.products}</mark> products
            </p>
          </div>
          <Link className={styles.categories} to="/categories">Go to categories</Link>
        </>
      )
  )
}
