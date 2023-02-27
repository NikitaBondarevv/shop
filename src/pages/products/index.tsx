import { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { deleteProduct, getProducts, updateProduct } from 'contracts/products'
import { IProduct } from 'interfaces/IProduct'
import { EditableText } from 'components/editableText'
import { Edit } from './svgIcons/edit'
import { Delete } from './svgIcons/delete'
import styles from './styles.css'
import { Link } from 'react-router-dom'
import { WarningWindow } from 'components/warningWindow'
import BagIcon from './images/bag.png'

export const Products = () => {
  const [value, setValue] = useState('')
  const [products, setProducts] = useState<IProduct[]>([])
  const [editIndex, setEditIndex] = useState(-1)
  const [removeId, setRemoveId] = useState<number | undefined>(undefined)
  const allProducts = products.filter(product => value.length >= 2 ? product.title.includes(value) : product.title)
  const getDescription = (id: number) => {
    const findProduct = products.find(data => data.id === id)

    return `You're going to remove "${findProduct?.title}" product. Press "Ok" to confirm.`
  }
  const description = useMemo(() => getDescription(removeId!), [removeId])

  const getData = async () => {
    setProducts(await getProducts())
  }

  useEffect(() => {
    getData()
  }, [])

  const searchCategory = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value)
  }

  const handleRename = async (product: IProduct, name: string) => {
    if (product.title !== name) {
      await updateProduct({ ...product, title: name })
      getData()
    }

    setEditIndex(-1)
  }

  const onConfirm = async () => {
    await deleteProduct(removeId!)
    setRemoveId(undefined)
    getData()
  }

  return (
    <>
      <h1 className={styles.heading}>
        Products
      </h1>
      {
        !!products.length && <input
            className={styles.search}
            type="text"
            placeholder="Enter at list 2 chars"
            value={value}
            onChange={searchCategory}
          />
      }
      {
        allProducts.length
          ? <ul className={styles.products}>
            {
              allProducts.map((product, index) => (
                <li key={product.id}>
                  <div className={styles.buttons}>
                    <button type="button" onClick={() => setEditIndex(index)}>
                      <Edit />
                    </button>
                    <button type="button" onClick={() => setRemoveId(product.id)}>
                      <Delete />
                    </button>
                  </div>
                  <Link to={`/products/${product.title}`}>
                    {
                      product.image
                        ? <img className={styles.productImage} src={product.image} />
                        : <img src={BagIcon} className={styles.noImage} />
                    }
                    <EditableText
                      isEdit={editIndex === index}
                      text={product.title}
                      onBlur={(name) => handleRename(product, name)}
                    />
                  </Link>
                </li>
              ))
            }
          </ul>
          : <span className={styles.noFilteredItemsMessage}>No products</span>
      }
      <Link className={styles.addNew} to="/products/new">ADD NEW</Link>
      {
        removeId &&
        <WarningWindow
          description={description}
          onConfirm={() => onConfirm()}
          onCancel={() => setRemoveId(undefined)}
        />
      }
    </>
  )
}
