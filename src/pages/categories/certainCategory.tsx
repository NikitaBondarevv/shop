import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { TCategory } from './types'
import { findCategories } from 'contracts/findCategories'
import styles from './styles.css'

export const CertainCategory = () => {
  const [category, setCategory] = useState<TCategory>({} as TCategory)
  const { title } = useParams()

  useEffect(() => {
    const getData = async () => {
      setCategory(await findCategories(title))
    }

    getData()
  }, [])

  return (
    <div className={styles.content}>
      <span className={styles.title}>
        {title?.toUpperCase()}
      </span>
      {
        category.products === undefined ? <span>No products</span> : <ul className={styles.products}>
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
}
