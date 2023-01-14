import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { EditableText } from 'components/editableText'
import { findProducts } from 'contracts/findProducts'
import styles from './styles.css'

export const Products = ({ authorised = false }) => {
  const [product, setProduct] = useState({})
  const { title } = useParams()

  useEffect(() => {
    const getData = async () => {
      setProduct(await findProducts(title))
    }

    getData()
  }, [])

  console.log(product);


  return (
    authorised
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
          <button type="button" className={styles.button}>SAVE</button>
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
