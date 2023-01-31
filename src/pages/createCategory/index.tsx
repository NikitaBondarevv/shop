import { useEffect, useState } from 'react'

import { getProducts } from 'contracts/products'
import { PublishItems } from 'components/publishItems'
import { createCategory } from 'contracts/categories'

export const CreateCategory = () => {
  const [products, setProducts] = useState([])

  const getData = async () => {
    setProducts(await getProducts())
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSave = async (name: string) => {
    await createCategory({
      title: name,
      published: true,
      id: 0,
    })
  }

  return (
    <PublishItems
      title={'CATEGORY: '}
      textForEditable={'NEW CATEGORY'}
      listTitle={'All products:'}
      items={products}
      description={''}
      message={'There are no products in this category.'}
      anotherMessage={''}
      create
      onSave={handleSave}
    />
  )
}
