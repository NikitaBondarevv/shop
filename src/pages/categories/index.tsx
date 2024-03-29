import { useContext, useEffect, useState } from 'react'

import { getCategories } from 'contracts/categories'
import { UserContext } from 'contexts/userContext'
import { ICategory } from 'interfaces/ICategories'
import { updateCategory } from 'contracts/categories'
import { PublishItems } from 'components/publishItems'
import styles from './styles.css'
import { Preloader } from 'components/preloader'

export const Categories = () => {
  const [isLoading, setIsloading] = useState(false)
  const { isAuthenticated } = useContext(UserContext)
  const [categories, setCategories] = useState<ICategory[]>([])
  const getDescription = (id: number) => {
    const category = categories.find(data => data.id === id)

    return `You're going to unpublish "${category?.title}" category. Press "Ok" to confirm.`
  }

  const getData = async () => {
    setIsloading(true)

    try {
      setCategories(await getCategories())
    } finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleConfirmRemove = async (category: ICategory) => {
    await updateCategory({ ...category, published: false })
    getData()
  }

  const handlePublish = async (category: ICategory) => {
    await updateCategory({ ...category, published: true })
    getData()
  }

  const handleRename = async (category: ICategory, name: string) => {
    if (category.title !== name) {
      await updateCategory({ ...category, title: name })
      getData()
    }
  }

  return (
    isLoading
      ? <Preloader />
      : (
        <>
          <h1 className={styles.title}>
            CATEGORIES
          </h1>
          {
            <PublishItems
              publishListTitle="Published Categories:"
              listTitle="Categories:"
              items={categories}
              onRemove={handleConfirmRemove}
              getWarningDescription={getDescription}
              onPublish={handlePublish}
              noAllItemsMessage="There are no published categories"
              noFilteredItemsMessage="No categories"
              onRename={handleRename}
              filterPredicate={(data: ICategory) => Boolean(data.published)}
              getLink={(category) => `/categories/${category.title}`}
              viewMode={isAuthenticated}
              showAddNewButton={isAuthenticated}
            />
          }
        </>
      )
  )
}
