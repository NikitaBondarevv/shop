import styles from './styles.css'

export const NumberOfProductsAndCategories = ({ name, products }) => {
  return (
    <div className={styles.productsInfo}>
      <span className={styles.greetings}>
        Hello,
        {name}
      </span>
      <ul className={styles.list}>
        <li>
          You have {products.categories} categories
          ({products.publishedCategories} published)
        </li>
        <li>
          You have {products.products} products
        </li>
      </ul>
      <a className={styles.categories} href="#">Go to categories</a>
    </div>
  )
}
