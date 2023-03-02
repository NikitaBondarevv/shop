import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { findCategories, updateCategory } from 'contracts/categories'
import { UserContext } from 'contexts/userContext'
import { PublishItems } from 'components/publishItems'
import { getProducts } from 'contracts/products'
import { IProduct } from 'interfaces/IProduct'
import { ICategory } from 'interfaces/ICategories'
import styles from './styles.css'
import { Preloader } from 'components/preloader'

export const Category = () => {
  const [isLoading, setIsloading] = useState(false)
  const [category, setCategory] = useState<ICategory>()
  const [allProducts, setAllProducts] = useState<IProduct[]>([])
  const { title } = useParams()
  const { isAuthenticated } = useContext(UserContext)
  const getDescription = (id: number) => {
    const findProduct = category?.products?.find(data => data.id === id)

    return `You're going to remove "${findProduct?.title}" product. Press "Ok" to confirm.`
  }
  const categoryProductsIds = useMemo(() => (category?.products || []).map(product => product.id), [category?.products])

  const getData = async () => {
    setIsloading(true)

    try {
      setCategory(await findCategories(title))
      setAllProducts(await getProducts())
    } finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleRemove = async (product: IProduct) => {
    const index = category?.products?.indexOf(product)
    category?.products?.splice(index!, 1)

    await updateCategory(category!)
    getData()
  }

  const handleConfirmPublish = async ({ id, title }: IProduct) => {
    category?.products?.push({ id, title })

    await updateCategory(category!)
    getData()
  }

  const getCategoryProducts = (product: IProduct) => categoryProductsIds?.includes(product.id)

  return (
    isLoading
      ? <Preloader />
      : (
        <>
          <h1 className={styles.title}>
            {`CATEGORY: ${title?.toUpperCase()}`}
          </h1>
          {
            <PublishItems<IProduct>
              publishListTitle="Products in category:"
              listTitle="All products:"
              items={allProducts}
              onRemove={handleRemove}
              onPublish={handleConfirmPublish}
              getWarningDescription={getDescription}
              noAllItemsMessage="There are no products in this category"
              noFilteredItemsMessage="No products"
              filterPredicate={getCategoryProducts}
              showEditButton
              getLink={(product) => `/products/${product.title}`}
              viewMode={isAuthenticated}
            />
          }
        </>
      )
  )
}
