import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'

import { LoginForm } from 'components/loginForm/LoginForm'
import { UserContext } from 'contexts/userContext'
import { ProductsInfo } from './productsInfo'
import { Products } from './products'
import { CreateUser } from './createUser'
import { Profile } from './profile'

export const Pages = () => {
  const { isAuthenticated, setUser } = useContext(UserContext)

  return (
    <main>
      {
        isAuthenticated ? (
          <Routes>
            <Route path='/' element={<ProductsInfo />} />
            <Route path='/products' element={<Products />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        )
          : (
            <Routes>
              <Route path='/' element={<LoginForm setUser={setUser} />} />
              <Route path='/signUp' element={<CreateUser />} />
            </Routes>
          )
      }
    </main>
  )
}
