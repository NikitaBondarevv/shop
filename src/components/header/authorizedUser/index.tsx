import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { IProductInfo } from 'interfaces/IProductInfo'
import { getGeneralInfo } from 'contracts/getGeneralInfo'
import { UserContext } from 'contexts/userContext'
import { logout } from 'contracts/logout'
import styles from './styles.css'
import { UserIcon } from './userIcon'

export const AuthorizedUser = () => {
  const { user, setUser } = useContext(UserContext)
  const [products, setProducts] = useState<IProductInfo>({} as IProductInfo)

  useEffect(() => {
    const getData = async () => {
      setProducts(await getGeneralInfo())
    }

    getData()
  }, [])

  const logoutHandler = async () => {
    await logout()

    setUser()
  }

  return (
    <div className={styles.menu}>
      <Link to="/" className={styles.userName}>
        {user?.firstName}
        <UserIcon />
      </Link>
      <span className={styles.info}>
        {
         !Object.keys(products).length ? '(0 / 0)' : `(${products.categories} / ${products.products})`
        }
      </span>
      <ul className={styles.dropDown}>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link onClick={logoutHandler} to="/">Log out</Link>
        </li>
      </ul>
    </div>
  )
}
