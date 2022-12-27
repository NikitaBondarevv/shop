import styles from './styles.css'
import { TProductsInfoProps } from './types'

export const ProductsInfo = ({ name, products }: TProductsInfoProps) => (
  <div className={styles.productsInfo}>
    <span className={styles.greetings}>
      Hello, {name}
    </span>
    <div className={styles.info}>
      <p>
        You have <mark>{products.categories}</mark> categories
        (<mark>{products.publishedCategories}</mark> published)
      </p>
      <p>
        You have <mark>{products.products}</mark> products
      </p>
    </div>
    <a className={styles.categories} href="#">Go to categories</a>
  </div>
)
