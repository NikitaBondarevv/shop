import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from 'contexts/userContext'
import { logout } from 'contracts/logout'
import styles from './styles.css'

export const AuthorizedUser = () => {
  const { user, setUser } = useContext(UserContext)

  const logoutHandler = async () => {
    await logout()

    setUser()
  }

  return (
    <div className={styles.menu}>
      <Link to="/" className={styles.userName}>
        {user?.firstName}
      </Link>
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
