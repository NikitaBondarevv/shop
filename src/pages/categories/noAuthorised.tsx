import { Link } from 'react-router-dom'

import { TNoAuthorisedProps } from './types'
import styles from './styles.css'

export const NoAuthorised = ({ categories }: TNoAuthorisedProps) => {

  return (
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
}
