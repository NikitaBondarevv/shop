import { useMemo } from 'react'

import { TAuthorisedProps } from './types'
import { updateCategory } from 'contracts/categories'
import { PublishItems } from 'components/publishItems'
import { ICategory } from 'interfaces/ICategories'

export const Authorised = ({ categories, getData }: TAuthorisedProps) => {
  const description = useMemo(() => {
    const category = categories.find(data => data.id)

    return `You're going to unpublish "${category?.title}" category. Press "Ok" to confirm.`
  }, ['id'])

  const handleConfirmRemove = async (category: ICategory) => {
    await updateCategory({ ...category, published: false })
    getData()
  }

  const handlePublish = async (category: ICategory) => {
    await updateCategory({ ...category, published: true })
    getData()
  }

  const handleRename = async (category: ICategory, name: string) => {
    await updateCategory({ ...category, title: name })
    getData()
  }

  return (
    <PublishItems
      title="CATEGORIES"
      publishListTitle="Published Categories:"
      listTitle="Categories:"
      items={categories}
      onRemove={handleConfirmRemove}
      description={description}
      onPublish={handlePublish}
      message="There are no published categories"
      anotherMessage="No categories"
      onRename={handleRename}
    />
  )
}
