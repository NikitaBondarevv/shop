import { useEffect, useMemo, useState } from 'react'

import { TTarget } from './types'
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
  const [editId, setEditId] = useState(-1)
  const [id, setId] = useState<number | undefined>(undefined)
  const allProducts = products.filter(product => value.length >= 2 ? product.title.includes(value) : product.title)
  const getDescription = (id: number) => {
    const findProduct = products.find(data => data.id === id)

    return `You're going to remove "${findProduct?.title}" product. Press "Ok" to confirm.`
  }
  const description = useMemo(() => getDescription(id!), [id])

  const getData = async () => {
    setProducts(await getProducts())
  }

  useEffect(() => {
    getData()
  }, [])

  const searchCategory = ({ target: { value } }: TTarget) => {
    setValue(value)
  }

  const handleRename = async (product: IProduct, name: string) => {
    await updateProduct({ ...product, title: name })
    getData()

    setEditId(-1)
  }

  const onConfirm = async () => {
    await deleteProduct(id!)
    setId(undefined)
    getData()
  }

  return (
    <>
      <h1 className={styles.heading}>
        Products
      </h1>
      {
        allProducts.length
          ? <input
            className={styles.search}
            type="text"
            placeholder="Enter at list 2 chars"
            value={value}
            onChange={searchCategory}
          />
          : <span></span>
      }
      {
        allProducts.length
          ? <ul className={styles.products}>
            {
              allProducts.map(product => (
                <li key={product.id}>
                  <div className={styles.buttons}>
                    <button type="button" onClick={() => setEditId(product.id!)}>
                      <Edit />
                    </button>
                    <button type="button" onClick={() => setId(product.id)}>
                      <Delete />
                    </button>
                  </div>
                  <Link to={`/products/${product.title}`}>
                    {
                      product.image
                        ? <img className={styles.productImage} src={product.image} />
                        : <img src={BagIcon} className={styles.noImage} />
                    }
                    <EditableText isEdit={editId === product.id} text={product.title} onBlur={(name) => handleRename(product, name)} />
                  </Link>
                </li>
              ))
            }
          </ul>
          : <span className={styles.noFilteredItemsMessage}>No products</span>
      }
      <Link className={styles.addNew} to="/products/new">ADD NEW</Link>
      {
        id &&
        <WarningWindow
          description={description}
          onConfirm={() => onConfirm()}
          onCancel={() => setId(undefined)}
        />
      }
    </>
  )
}
