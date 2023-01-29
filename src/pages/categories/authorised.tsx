import { useMemo, useState } from 'react'

import { TAuthorisedProps } from './types'
import { updateCategory } from 'contracts/categories'
import { PublishItems } from 'components/publishItems'

export const Authorised = ({ categories, getData }: TAuthorisedProps) => {
  const [id, setId] = useState<number | undefined>(undefined)
  const [idUnPublish, setIdUnPublish] = useState<number | undefined>(undefined)
  const [edit, setEdit] = useState(false)
  const description = useMemo(() => {
    const category = categories.find(data => data.id === id)

    return `You're going to unpublish "${category?.title}" category. Press "Ok" to confirm.`
  }, [id])

  const handleConfirmUnpublish = async () => {
    const category = categories.find(data => data.id === id)

    setId(undefined)

    await updateCategory({ ...category!, published: false })
    getData()
  }

  const handleConfirmPublish = async () => {
    const category = categories.find(data => data.id === idUnPublish)

    await updateCategory({ ...category!, published: true })
    getData()
  }

  const handleConfirmRename = async () => {
    setEdit(true)
  }

  return (
    <PublishItems
      className="CATEGORIES"
      anotherName="Published Categories:"
      name="Categories:"
      items={categories}
      onRemove={() => handleConfirmUnpublish()}
      description={description}
      setId={setId}
      id={id}
      setIdUnPublish={setIdUnPublish}
      onPublished={handleConfirmPublish}
      message="There are no published categories"
      anotherMessage="No categories"
      onRename={() => handleConfirmRename()}
      edit={edit}
    />
  )
}
