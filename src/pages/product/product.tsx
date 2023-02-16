import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { IProduct } from 'interfaces/IProduct'
import { UserContext } from 'contexts/userContext'
import { findProduct, updateProduct } from 'contracts/products'
import { ProductItems } from 'components/productItems'
import styles from './styles.css'

export const Product = () => {
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    title: '',
    description: '',
    image: '',
    price: 0
  })
  const { title } = useParams()
  const { isAuthenticated } = useContext(UserContext)

  const getData = async () => {
    setProduct(await findProduct(title))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSave = async (title: string, price: string, description: string) => {
    if (title !== '' || price !== '0' || description !== 'No description') {
      await updateProduct({
        ...product,
        title,
        price,
        description
      })
    }
  }

  return (
    isAuthenticated
      ? <ProductItems onSave={handleSave} title={product.title} price={String(product.price)} description={product.description || 'No description'} />
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
