import { useState } from 'react'
import { Link } from 'react-router-dom'

import { EditableText } from 'components/editableText'
import styles from './styles.css'
import { TProduct } from './types'

export const ProductItems = ({
  onSave,
  product,
  messageForDescription,
  create,
  title,
  price,
  description
}: TProduct) => {
  const [titleProduct, setTitleProductProduct] = useState(create ? title : product!.title)
  const [priceProduct, setPriceProduct] = useState(String(create ? price : product!.price))
  const [descriptionProduct, setDescriptionProduct] = useState(create ? description : product!.description)

  return (
    <div>
      <span className={styles.title}>
        TITLE: <EditableText onBlur={(title) => setTitleProductProduct(title)} text={create ? title : product!.title} />
      </span>
      <span className={styles.price}>
        $ <EditableText onBlur={(price) => setPriceProduct(price)} text={String(create ? price : product!.price)} price />
      </span>
      <div className={styles.description}>
        <EditableText onBlur={(description) => setDescriptionProduct(description)} text={create ? description : product!.description || messageForDescription} multiLine />
      </div>
      <Link to={`/products/${titleProduct}`} className={styles.save} onClick={() => onSave(titleProduct!, priceProduct, descriptionProduct!)}>SAVE</Link>
    </div>
  )
}
