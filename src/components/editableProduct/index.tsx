import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { EditableText } from 'components/editableText'
import styles from './styles.css'
import { TProduct } from './types'

export const EditableProduct = ({
  onSave,
  title,
  price,
  description
}: TProduct) => {
  const [titleProduct, setTitleProductProduct] = useState('')
  const [priceProduct, setPriceProduct] = useState('')
  const [descriptionProduct, setDescriptionProduct] = useState('')

  useEffect(() => {
    setTitleProductProduct(title)
    setPriceProduct(price)
    setDescriptionProduct(description)
  }, [title, price, description])

  return (
    <>
      <span className={styles.title}>
        <mark>
          TITLE:
        </mark>
        <EditableText
          onBlur={(title) => setTitleProductProduct(title)}
          text={titleProduct || 'No title'}
        />
      </span>
      <span className={styles.price}>
        <mark>
          $
        </mark>
        <EditableText
          onBlur={(price) => setPriceProduct(price)}
          text={priceProduct || 'No price'}
          price
        />
      </span>
      <div className={styles.description}>
        <EditableText
          className={styles.descriptionText}
          onBlur={(description) => setDescriptionProduct(description)}
          text={descriptionProduct || 'Add some brief description here.'}
          multiLine
        />
      </div>
      <Link to={`/products/${titleProduct}`} className={styles.save} onClick={() => onSave(titleProduct, priceProduct, descriptionProduct)}>SAVE</Link>
    </>
  )
}
