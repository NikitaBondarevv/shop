import styles from './styles.css'

export const NumberOfProductsAndCategories = ({ name, products }) => {
  const productsAndCategories = products

  const getNumberOfCategories = () => {
    return productsAndCategories.map(product => product.category)
  }
  
  const getNumberOfProducts = () => {
    return productsAndCategories.map(product => product.product)
  }
  
  const getNumberOfPublished = () => {
    const published = []

    productsAndCategories.map(product => {
      if (product.published === true) {
        published.push(product.published)
      }
    })

    return published
  }

  return (
    <div className={styles.productsInfo} >
      <span className={styles.greetings} >Hello, {name}</span>
      <ul className={styles.list}>
        <li>
          You have {getNumberOfCategories().length} categories ({getNumberOfPublished().length} published)
        </li>
        <li>
          You have {getNumberOfProducts().length} products
        </li>
      </ul>
      <a className={styles.categories} href='#'>Go to categories</a>
    </div>
  )
}
