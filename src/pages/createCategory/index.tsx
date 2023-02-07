import { useEffect, useState } from 'react'

import { getProducts } from 'contracts/products'
import { PublishItems } from 'components/publishItems'
import { createCategory } from 'contracts/categories'
import { IProduct } from 'interfaces/IProduct'
import { EditableText } from 'components/editableText'
import styles from './styles.css'

export const CreateCategory = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [valueEdit, setValueEdit] = useState('NEW CATEGORY')
  const getWarningDescription = (id: number) => {
    const findProduct = products?.find(data => data.id === id)

    return `You're going to remove "${findProduct?.title}" product. Press "Ok" to confirm.`
  }

  useEffect(() => {
    const getData = async () => {
      setAllProducts(await getProducts())
    }

    getData()
  }, [])

  const handleSave = async (name: string) => {
    await createCategory({
      title: name,
      published: true,
      products
    })
  }

  const handleRemove = async (product: IProduct) => {
    const index = products!.indexOf(product)
    products!.splice(index!, 1)
    setProducts([...products])
  }

  const handleConfirmPublish = async ({ id, title }: IProduct) => {
    setProducts([...products, { id, title }])
  }

  const getCategoryProducts = (product: IProduct) => !!products.find(item => product.id === item.id)

  return (
    <>
      <h1 className={styles.title}>
        CATEGORY: {
          <EditableText
            text={valueEdit}
            className={styles.editableText}
            onBlur={(name) => setValueEdit(name)}
          />
        }
      </h1>
      <PublishItems
        listTitle="All products:"
        items={allProducts}
        getWarningDescription={(id) => getWarningDescription(id)}
        noAllItemsMessage="There are no products in this category."
        noFilteredItemsMessage="No products"
        publishListTitle="Products in category:"
        create
        onRemove={handleRemove}
        onPublish={handleConfirmPublish}
        onSave={handleSave}
        filterPredicate={getCategoryProducts}
        showEditButton
        valueEdit={valueEdit}
        viewMode
        getLink={(product) => `/products/${product.title}`}
      />
    </>
  )
}
