import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { findCategories } from 'contracts/findCategories'
import { UserContext } from 'contexts/userContext'
import { TCategory } from './types'
import deleteIcon from './images/delete.png'
import styles from './styles.css'

export const CertainCategory = () => {
  const [category, setCategory] = useState<TCategory>({} as TCategory)
  const { title } = useParams()
  const { isAuthenticated } = useContext(UserContext)

  useEffect(() => {
    const getData = async () => {
      setCategory(await findCategories(title))
    }

    getData()
  }, [])

  return (
    isAuthenticated
      ? (
        <div>
          <div className={`${styles.content} ${styles.authorised}`}>
            <span className={styles.title}>
              CATEGORY: {title?.toUpperCase()}
            </span>
            {
              category.products === undefined
                ? <span>No products</span>
                : <ul className={styles.products}>
                  {
                    category.products?.map(product => (
                      <li className={styles.product} key={product.id}>
                        <Link to={`/products/${product.title}`}>
                          {product.title}
                        </Link>
                        <a href="#" className={styles.delete}>
                          <img src={deleteIcon} alt="delete" />
                        </a>
                      </li>
                    ))
                  }
                </ul>
            }
          </div>
        </div>
      )
      : (
        <div className={`${styles.content} ${styles.noAuthorised}`}>
          <span className={styles.title}>
            {title?.toUpperCase()}
          </span>
          {
            category.products === undefined
              ? <span>No products</span>
              : <ul className={styles.products}>
                {
                  category.products?.map(product => (
                    <li>
                      <Link to={`/products/${product.title}`}>
                        {product.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
          }
        </div>
      )
  )
}
