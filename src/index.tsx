import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import { Header } from 'components/header'
import { Pages } from 'pages'
import { checkUser } from 'contracts/checkUser'
import { IUser } from 'interfaces/IUser'
import { UserContext } from './contexts/userContext'
import './styles.css'

const root = createRoot(document.getElementById('app')!)

const App = () => {
  const [user, setUser] = useState<IUser | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const user = await checkUser()

      if (!user.error) {
        setUser(user)
      }
    }

    fetchData()
  }, [])
  
  const contextValue = useMemo(() => ({
    isAuthenticated: user && !user.error,
    user,
    setUser,
  }), [user])

  return (

    <UserContext.Provider value={contextValue}>
      <Header />
      <Pages />
    </UserContext.Provider>
  )
}

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
