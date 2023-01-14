import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCategories } from 'contracts/getCategories'
import styles from './styles.css'
import { IProduct } from 'interfaces/IProduct'

export const Categories = () => {
  const [categories, setCategories] = useState<IProduct[]>([])

  useEffect(() => {
    const getData = async () => {
      setCategories(await getCategories())
    }

    getData()
  }, [])

  return (
    <div className={styles.content}>
      <span className={styles.title}>
        Categories
      </span>
      <ul>
        {
          categories.map(category => (
            <li key={category.id}>
              <Link to={`${category.title}`}>
                {category.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
