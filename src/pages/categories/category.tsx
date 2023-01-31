import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { findCategories } from 'contracts/categories'
import { UserContext } from 'contexts/userContext'
import { PublishItems } from 'components/publishItems'
import { deleteProduct, getProducts, updateProduct } from 'contracts/products'
import styles from './styles.css'
import { IProduct } from 'interfaces/IProduct'
import { ICategory } from 'interfaces/ICategories'

export const Category = () => {
  const [category, setCategory] = useState<ICategory>({} as ICategory)
  const [allProducts, setAllProducts] = useState<IProduct[]>([])
  const { title } = useParams()
  const { isAuthenticated } = useContext(UserContext)
  const [id, setId] = useState<number | undefined>(undefined)
  const getDescription = (id: number) => {
    const findProduct = category?.products?.find(data => data.id === id)

    return `You're going to remove "${findProduct?.title}" product. Press "Ok" to confirm.`
  }


  const unpublished = category?.products?.filter(data => !data.published)
  const published = category?.products?.filter(data => data.published)

  const getData = async () => {
    setCategory(await findCategories(title))
    setAllProducts(await getProducts())
  }

  useEffect(() => {
    getData()
  }, [])

  const handleConfirmDelete = async () => {
    const product = published!.find(data => data.id === id)

    setId(undefined)

    await deleteProduct(product!)
    getData()
  }

  const handleConfirmPublish = async () => {
    const product = unpublished!.find(data => data.id)

    await updateProduct({ ...product!, published: true })
    getData()
  }

  return (
    isAuthenticated
      ? (
        <PublishItems<IProduct>
          title={`CATEGORY: ${title?.toUpperCase()}`}
          publishListTitle="Products in category:"
          listTitle="All products:"
          items={allProducts}
          onRemove={() => handleConfirmDelete()}
          onPublish={() => handleConfirmPublish()}
          getDescription={getDescription}
          postingMessage="There are no products in this category"
          listMessage="No products"
          filterPredicate={() => false} />
      )
      : (
        <div className={`${styles.content} ${styles.noAuthorised}`}>
          <span className={styles.title}>
            {title?.toUpperCase()}
          </span>
          {
            category?.products === undefined
              ? <span>No products</span>
              : <ul className={styles.products}>
                {
                  category.products?.map(product => (
                    <li>
                      <Link to={`/products/${product.title}`}>
                        {product.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
          }
        </div>
      )
  )
}
