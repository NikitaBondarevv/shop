import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { IProduct } from 'interfaces/IProduct'
import { UserContext } from 'contexts/userContext'
import { EditableText } from 'components/editableText'
import { findProducts } from 'contracts/findProducts'
import styles from './styles.css'

export const Products = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const { title } = useParams()
  const { isAuthenticated } = useContext(UserContext)

  useEffect(() => {
    const getData = async () => {
      setProduct(await findProducts(title))
    }

    getData()
  }, [])

  console.log(product);


  return (
    isAuthenticated
      ? (
        <div className={styles.productInformation} >
          <span className={styles.title}>
            TITLE: <EditableText text={product.title} />
          </span>
          <span className={styles.price}>
            $ <EditableText text={product.price} price />
          </span>
          <div className={styles.description}>
            <EditableText text={product.description || 'No description'} multiLine />
          </div>
          <button type="button" className={styles.save}>SAVE</button>
        </div >
      )
      : (
        <div className={styles.productInformation} >
          <span className={styles.title}>
            TITLE: {product.title}
          </span>
          <span className={styles.price}>
            $ {product.price}
          </span>
          <div className={styles.description}>
            {product.description || 'No description'}
          </div>
        </div >
      )
  )
}
