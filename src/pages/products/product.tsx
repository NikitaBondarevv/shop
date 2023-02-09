import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { IProduct } from 'interfaces/IProduct'
import { UserContext } from 'contexts/userContext'
import { EditableText } from 'components/editableText'
import { findProduct, updateProduct } from 'contracts/products'
import styles from './styles.css'

export const Product = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const { title } = useParams()
  const { isAuthenticated } = useContext(UserContext)
  const [description, setDescription] = useState(product.description)
  const [titleProduct, setTitleProduct] = useState(product.title)
  const [price, setPrice] = useState(product.price)

  const getData = async () => {
    setProduct(await findProduct(title))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSave = async () => {
    await updateProduct({
      ...product,
      title: titleProduct,
      price,
      description: description
    })
  }

  return (
    isAuthenticated
      ? (
        <div className={styles.productInformation} >
          <span className={styles.title}>
            TITLE: <EditableText onBlur={(titleProduct) => setTitleProduct(titleProduct)} text={product.title} />
          </span>
          <span className={styles.price}>
            $ <EditableText onBlur={(price) => setPrice(price)} text={String(product.price)} price />
          </span>
          <div className={styles.description}>
            <EditableText onBlur={(description) => setDescription(description)} text={product.description || 'No description'} multiLine />
          </div>
          <Link to={`/products/${titleProduct}`} className={styles.save} onClick={handleSave}>SAVE</Link>
        </div>
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
