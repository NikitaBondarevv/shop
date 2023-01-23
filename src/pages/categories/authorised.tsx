import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { IProduct } from 'interfaces/IProduct'
import { WarningWindow } from 'components/warningWindow'
import { getCategories } from 'contracts/getCategories'
import { TAuthorisedProps, TTarget } from './types'
import editIcon from './images/edit.png'
import deleteIcon from './images/delete.png'
import styles from './styles.css'

export const Authorised = ({ categories, setCategories }: TAuthorisedProps) => {
  const [originCategories, setOriginCategories] = useState<IProduct[]>([])
  const [showWarningWindow, setShowWarningWindow] = useState(false)
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [id, setId] = useState(0)

  const getData = async () => {
    setOriginCategories(await getCategories())
  }

  useEffect(() => {
    getData()
  }, [])

  const searchCategory = ({ target: { value } }: TTarget) => {
    setValue(value)

    setCategories(value.length > 1 ? categories.filter(category => category.title.includes(value)) : originCategories)
  }

  const hideWarningWindow = (id: number = 0, title: string = '') => {
    setShowWarningWindow(!showWarningWindow)

    setId(id)
    setTitle(title)
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
              originCategories.map(category => (
                category.published && (
                  <li className={styles.category} key={category.id}>
                    <Link to={`${category.title}`}>
                      {category.title.toUpperCase()}
                    </Link>
                    <div className={styles.buttons}>
                      <button className={styles.edit}>
                        <img src={editIcon} alt="edit" />
                      </button>
                      <button className={styles.delete}>
                        <img src={deleteIcon} onClick={() => hideWarningWindow(category.id, category.title)} alt="delete" />
                      </button>
                    </div>
                  </li>
                )

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
              categories.map(category => (
                !category.published && (
                  <li key={category.id}>
                    {category.title}
                  </li>
                )

              ))
            }
          </ul>
        </div>
      </div>
      {
        showWarningWindow && <WarningWindow title={title} id={id} hideWarningWindow={hideWarningWindow} getData={getData} />
      }
    </div>
  )
}
