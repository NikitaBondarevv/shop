import { useState } from 'react'
import { Link } from 'react-router-dom'

import { EditableText } from 'components/editableText'
import styles from './styles.css'
import { TProduct } from './types'

export const ProductItems = ({
  onSave,
  title,
  price,
  description
}: TProduct) => {
  const [titleProduct, setTitleProductProduct] = useState(title)
  const [priceProduct, setPriceProduct] = useState(String(price))
  const [descriptionProduct, setDescriptionProduct] = useState(description)

  return (
    <div>
      <span className={styles.title}>
        TITLE: <EditableText onBlur={(title) => setTitleProductProduct(title)} text={title} />
      </span>
      <span className={styles.price}>
        $ <EditableText onBlur={(price) => setPriceProduct(price)} text={String(price)} price />
      </span>
      <div className={styles.description}>
        <EditableText classNameSpan={styles.descriptionText} onBlur={(description) => setDescriptionProduct(description)} text={descriptionProduct === '' ? 'Put your description here' : description} multiLine />
      </div>
      <Link to={`/products/${titleProduct}`} className={styles.save} onClick={() => onSave(titleProduct!, priceProduct, descriptionProduct!)}>SAVE</Link>
    </div>
  )
}
