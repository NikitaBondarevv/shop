import { NumberOfProductsAndCategories } from '../numberOfProductsAndCategories'
import { products } from '../helpers/products'
import { ProductInformation } from '../productInformation'
import styles from './styles.css'

export const Main = () => (
  <main className={styles.main}>
    <NumberOfProductsAndCategories name="Nikita" products={products} />
    <ProductInformation />
  </main>
)
