import { useEffect, useMemo, useState } from 'react'

import { getProducts } from 'contracts/products'
import { PublishItems } from 'components/publishItems'
import { createCategory } from 'contracts/categories'
import { IProduct } from 'interfaces/IProduct'

export const CreateCategory = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([])
  const products: IProduct[] = []
  const productsIds = useMemo(() => (products || []).map(product => product.id), [products])

  console.log(productsIds);
  

  const getData = async () => {
    setAllProducts(await getProducts())
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSave = async (name: string) => {
    await createCategory({
      title: name,
      published: true,
      id: 0,
      products: productsIds
    })
  }

  const handleRemove = async (product: IProduct) => {
    const index = products.indexOf(product)
    products.splice(index!, 1)

    getData()
  }

  const handleConfirmPublish = async ({ id, title }: IProduct) => {
    products.push({ id, title })

    getData()
  }

  console.log(products);
  

  const getCategoryProducts = (product: IProduct) => productsIds?.includes(product.id)

  return (
    <PublishItems
      title="CATEGORY: "
      textForEditable="NEW CATEGORY"
      listTitle="All products:"
      items={allProducts}
      getDescription={() => ""}
      postingMessage="There are no products in this category."
      listMessage=""
      create
      onRemove={handleRemove}
      onPublish={handleConfirmPublish}
      onSave={handleSave}
      filterPredicate={getCategoryProducts}
      showEditButton
    />
  )
}
