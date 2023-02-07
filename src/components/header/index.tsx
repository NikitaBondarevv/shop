import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'

import styles from './styles.css'
import loginPage from './images/loginPage.png'
import { navigation } from 'helpers/navigation'
import { notLoggedNavigation } from 'helpers/notLoggedNavigation'
import { getNavLinkName } from 'helpers/getNavLinkName'
import { UserContext } from 'contexts/userContext'
import { AuthorizedUser } from './authorizedUser'
import { HamburgerMenu } from './hamburgerMenu'
import { Logo } from './svgIcons/logo'

export const Header = () => {
  const { isAuthenticated } = useContext(UserContext)

  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        {
          isAuthenticated
            ? (
              <ul className={styles.list}>
                {navigation.map((link, index) => (
                  <li key={index}>
                    <NavLink to={`/${link.value}`} className={({ isActive }) => getNavLinkName(isActive, styles[link.value], styles)}>
                      {link.text}
                      {link.icon && <link.icon />}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )
            : (
              <ul className={styles.list}>
                {notLoggedNavigation.map((link, index) => (
                  <li key={index}>
                    <NavLink to={`/${link.value}`} className={({ isActive }) => getNavLinkName(isActive, styles[link.value], styles)}>{link.text}{link.icon && <link.icon />}</NavLink>
                  </li>
                ))}
              </ul>
            )
        }
        <HamburgerMenu />
      </nav>
      {
        isAuthenticated
          ? (
            <AuthorizedUser />
          )
          : (
            <div className={styles.loginPanel}>
              <img src={loginPage} alt="login page" />
              <Link to="/signIn">Sign In</Link>
              <span>/</span>
              <Link to="/signUp">Sign Up</Link>
            </div>
          )
      }
    </header>
  )
}
