import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { IProduct } from 'interfaces/IProduct'
import { UserContext } from 'contexts/userContext'
import { findProduct, updateProduct } from 'contracts/products'
import { EditableProduct } from 'components/editableProduct'
import styles from './styles.css'

export const Product = () => {
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    title: '',
    description: '',
    image: '',
    price: '0'
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
    if (title !== product.title || price !== product.price || description !== product.description) {
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
      ? (
        <EditableProduct
          onSave={handleSave}
          title={product.title}
          price={String(product.price)}
          description={product.description!}
        />
      )
      : (
        <>
          <span className={styles.title}>
            <mark>
              TITLE:
            </mark>
            {product.title}
          </span>
          <span className={styles.price}>
            <mark>
              $
            </mark>
            {product.price}
          </span>
          <div className={styles.description}>
            {product.description}
          </div>
        </>
      )
  )
}
