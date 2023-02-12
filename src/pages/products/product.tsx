import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { IProduct } from 'interfaces/IProduct'
import { UserContext } from 'contexts/userContext'
import { findProduct, updateProduct } from 'contracts/products'
import { ProductItems } from 'components/product'
import styles from './styles.css'

export const Product = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const { title } = useParams()
  const { isAuthenticated } = useContext(UserContext)

  const getData = async () => {
    setProduct(await findProduct(title))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSave = async (title: string, price: string, description: string) => {
    await updateProduct({
      ...product,
      title,
      price,
      description
    })
  }

  return (
    isAuthenticated
      ? <ProductItems onSave={handleSave} product={product} messageForDescription="No description" />
      : (
        <>
          <span className={styles.title}>
            TITLE: {product.title}
          </span>
          <span className={styles.price}>
            $ {product.price}
          </span>
          <div className={styles.description}>
            {product.description || 'No description'}
          </div>
        </>
      )
  )
}
