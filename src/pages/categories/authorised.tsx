import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { WarningWindow } from 'components/warningWindow'
import { TAuthorisedProps, TTarget } from './types'
import editIcon from './images/edit.png'
import deleteIcon from './images/delete.png'
import styles from './styles.css'
import { updateCategory } from 'contracts/updateCategory'

export const Authorised = ({ categories, getData }: TAuthorisedProps) => {
  const publishedCatigories = categories.filter(data => data.published)
  const [value, setValue] = useState('')
  const unpublishedCatigories = categories.filter(data => !data.published && (!value || data.title.includes(value)))
  const [id, setId] = useState<number | undefined>(undefined)
  const description = useMemo(() => {
    const category = publishedCatigories.find(data => data.id)

    return `You're going to unpublish "${category?.title}" category. Press "Ok" to confirm.`
  }, [id])

  const searchCategory = ({ target: { value } }: TTarget) => {
    setValue(value)
  }

  const handleConfirmUnpublish = async () => {
    const category = publishedCatigories.find(data => data.id)

    setId(undefined)

    await updateCategory({ ...category!, published: false })
    getData()
  }

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>
        CATEGORIES
      </h1>
      <div className={styles.categories}>
        <div className={styles.published}>
          <span>
            Published Categories:
          </span>
          <ul>
            {
              publishedCatigories.map(category => (
                <li className={styles.category} key={category.id}>
                  <Link to={`${category.title}`}>
                    {category.title.toUpperCase()}
                  </Link>
                  <div className={styles.buttons}>
                    <button className={styles.edit}>
                      <img src={editIcon} alt="edit" />
                    </button>
                    <button className={styles.delete} onClick={() => setId(category.id)} >
                      <img src={deleteIcon} alt="delete" />
                    </button>
                  </div>
                </li>
              ))
            }
          </ul>
          <Link className={styles.addNew} to="/new">ADD NEW</Link>
        </div>
        <div className={styles.noPublished}>
          <span>
            Categories:
          </span>
          <input
            className={styles.search}
            type="text"
            placeholder="SEARCH"
            value={value}
            onChange={searchCategory}
          />
          <ul>
            {
              unpublishedCatigories.map(category => (
                <li key={category.id}>
                  {category.title}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      {
        id && <WarningWindow description={description} onConfirm={handleConfirmUnpublish} onCancel={() => setId(undefined)} />
      }
    </div>
  )
}
