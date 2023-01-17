import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'

import styles from './styles.css'
import logo from './images/logo.png'
import loginPage from './images/loginPage.png'
import { navigation } from 'helpers/navigation'
import { notLoggedNavigation } from 'helpers/notLoggedNavigation'
import { UserContext } from 'contexts/userContext'
import { AuthorizedUser } from './authorizedUser'

const getNavLinkName = (isActive: boolean, value: string = '') => {
  const activeClassName = isActive ? styles.active : ''

  return `${value} ${activeClassName}`
}

export const Header = () => {
  const { isAuthenticated } = useContext(UserContext)

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} className={styles.logo} alt="logo" />
      </Link>
      <nav>
        {
          isAuthenticated
            ? (
              <ul className={styles.list}>
                {navigation.map((link, index) => (
                  <li key={index}>
                    <NavLink to={`/${link.value}`} className={({ isActive }) => getNavLinkName(isActive, styles[link.value])}>{link.text}</NavLink>
                  </li>
                ))}
              </ul>
            )
            : (
              <ul className={styles.list}>
                {notLoggedNavigation.map((link, index) => (
                  <li key={index}>
                    <NavLink to={`/${link.value}`} className={({ isActive }) => getNavLinkName(isActive, styles[link.value])}>{link.text}</NavLink>
                  </li>
                ))}
              </ul>
            )
        }
      </nav>
      {
        isAuthenticated
          ? <AuthorizedUser />
          : <div className={styles.loginPanel}>
            <img src={loginPage} alt="login page" />
            <Link to="/signIn">Sign In</Link>
            <span>/</span>
            <Link to="/signUp">Sign Up</Link>
          </div>
      }
    </header>
  )
}
