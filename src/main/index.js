import { NumberOfProductsAndCategories } from '../numberOfProductsAndCategories'
import { products } from '../helpers/products'
import styles from './styles.css'
import { ProductInformation } from '../productInformation'

export const Main = () => (
  <main className={styles.main}>
    <NumberOfProductsAndCategories name='Nikita' products={products} />
    <ProductInformation />
  </main>
)