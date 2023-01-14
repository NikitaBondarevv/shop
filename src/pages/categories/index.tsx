import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCategories } from 'contracts/getCategories'
import styles from './styles.css'

export const Categories = () => {
  const [categories, setCategories] = useState([])

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
