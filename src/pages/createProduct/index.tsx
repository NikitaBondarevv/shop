import { EditableText } from 'components/editableText'
import { createProduct } from 'contracts/products'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.css'

export const CreateProduct = () => {
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')

  const handleSave = async () => {
    await createProduct({
      title: title,
      price,
      description: description,
    })
  }

  return (
    <div className={styles.productInformation} >
      <span className={styles.title}>
        TITLE: <EditableText onBlur={(titleProduct) => setTitle(titleProduct)} text={title || 'NEW PRODUCT'} />
      </span>
      <span className={styles.price}>
        $ <EditableText onBlur={(price) => setPrice(price)} text={price || '0'} price />
      </span>
      <div className={styles.description}>
        <EditableText onBlur={(description) => setDescription(description)} text={description || 'Add some brief description here.'} multiLine />
      </div>
      <Link to={`/products/${title}`} className={styles.save} onClick={handleSave}>SAVE</Link>
    </div>
  )
}
