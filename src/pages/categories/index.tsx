import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { IProduct } from 'interfaces/IProduct'
import { getCategories } from 'contracts/getCategories'
import { UserContext } from 'contexts/userContext'
import { WarningWindow } from 'components/warningWindow'
import editIcon from './images/edit.png'
import deleteIcon from './images/delete.png'
import { TTarget } from './types'
import styles from './styles.css'

export const Categories = () => {
  const { isAuthenticated } = useContext(UserContext)
  const [originCategories, setOriginCategories] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<IProduct[]>([])
  const [showWarningWindow, setShowWarningWindow] = useState(false)
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [id, setId] = useState(0)

  const getData = async () => {
    setOriginCategories(await getCategories())
    setCategories(await getCategories())
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
    isAuthenticated ? (
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
      : (
        <div className={styles.content}>
          <h1 className={styles.title}>
            CATEGORIES
          </h1>
          <ul>
            {
              categories.map(category => (
                <li key={category.id}>
                  <Link to={`${category.title}`}>
                    {category.title.toUpperCase()}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      )
  )
}
