import { TAuthorisedProps } from './types'
import { updateCategory } from 'contracts/categories'
import { PublishItems } from 'components/publishItems'
import { ICategory } from 'interfaces/ICategories'

export const Authorised = ({ categories, getData }: TAuthorisedProps) => {
  const getDescription = (id: number) => {
    const category = categories.find(data => data.id === id)

    return `You're going to unpublish "${category?.title}" category. Press "Ok" to confirm.`
  }

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
      getDescription={getDescription}
      onPublish={handlePublish}
      postingMessage="There are no published categories"
      listMessage="No categories"
      onRename={handleRename}
      filterPredicate={(data: ICategory) => Boolean(data.published)}
    />
  )
}
