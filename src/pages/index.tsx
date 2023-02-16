import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'

import { LoginForm } from 'pages/loginForm/LoginForm'
import { UserContext } from 'contexts/userContext'
import { ProductsInfo } from './productsInfo'
import { Product } from './product/product'
import { CreateUser } from './createUser'
import { Profile } from './profile'
import { Categories } from './categories'
import { Category } from './category/category'
import { Welcome } from './welcome'
import { Contacts } from './contacts'
import { Registered } from './registered'
import { CreateCategory } from './createCategory'
import styles from './styles.css'
import { Products } from './products'
import { CreateProduct } from './createProduct'

export const Pages = () => {
  const { isAuthenticated, setUser } = useContext(UserContext)

  return (
    <main className={styles.main}>
      <Routes>
        {
          !isAuthenticated && (
            <>
              <Route path='/' element={<Welcome />} />
              <Route path='/signIn' element={<LoginForm setUser={setUser} />} />
              <Route path='/signUp' element={<CreateUser />} />
              <Route path='/success' element={<Registered />} />
            </>
          )
        }
        <Route path='/' element={<ProductsInfo />} />
        <Route path='/products/:title' element={<Product />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:title' element={<Category />} />
        <Route path='/new' element={<CreateCategory />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/new' element={<CreateProduct />} />
      </Routes>
    </main>
  )
}
