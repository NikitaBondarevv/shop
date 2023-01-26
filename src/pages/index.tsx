import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'

import { LoginForm } from 'components/loginForm/LoginForm'
import { UserContext } from 'contexts/userContext'
import { ProductsInfo } from './productsInfo'
import { Products } from './products'
import { CreateUser } from './createUser'
import { Profile } from './profile'
import { Categories } from './categories'
import { CertainCategory } from './categories/certainCategory'
import { Welcome } from './welcome'
import { Contacts } from './contacts'
import { Registered } from './registered'

export const Pages = () => {
  const { isAuthenticated, setUser } = useContext(UserContext)

  return (
    <main>
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
        <Route path='/products/:title' element={<Products />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:title' element={<CertainCategory />} />
      </Routes>
    </main>
  )
}
