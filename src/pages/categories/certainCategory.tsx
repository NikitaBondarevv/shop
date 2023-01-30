import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { findCategories } from 'contracts/categories'
import { UserContext } from 'contexts/userContext'
import { TCategory } from './types'
import styles from './styles.css'
import { PublishItems } from 'components/publishItems'
import { deleteProduct, updateProduct } from 'contracts/products'

export const CertainCategory = () => {
  const [category, setCategory] = useState<TCategory>({} as TCategory)
  const { title } = useParams()
  const { isAuthenticated } = useContext(UserContext)
  const [id, setId] = useState<number | undefined>(undefined)
  const [idUnPublish, setIdUnPublish] = useState<number | undefined>(undefined)
  const description = useMemo(() => {
    const findProduct = category.products?.find(data => data.id === id)

    return `You're going to remove "${findProduct?.title}" product. Press "Ok" to confirm.`
  }, [id])

  const unpublished = category.products?.filter(data => !data.published)
  const published = category.products?.filter(data => data.published)

  const getData = async () => {
    setCategory(await findCategories(title))
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
    const product = unpublished!.find(data => data.id === idUnPublish)

    await updateProduct({ ...product!, published: true })
    getData()
  }

  return (
    isAuthenticated
      ? (
        <PublishItems
          title={`CATEGORY: ${title?.toUpperCase()}`}
          publishListTitle="Products in category:"
          listTitle="All products:"
          items={category.products!}
          onRemove={() => handleConfirmDelete()}
          onPublished={() => handleConfirmPublish()}
          description={description}
          setId={setId}
          id={id}
          message="There are no products in this category"
          anotherMessage ="No products"
          setIdUnPublish={setIdUnPublish}
        />
      )
      : (
        <div className={`${styles.content} ${styles.noAuthorised}`}>
          <span className={styles.title}>
            {title?.toUpperCase()}
          </span>
          {
            category.products === undefined
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
