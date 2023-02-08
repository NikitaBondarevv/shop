import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { navigation } from 'helpers/navigation'
import styles from './styles.css'
import { UserContext } from 'contexts/userContext'
import { notLoggedNavigation } from 'helpers/notLoggedNavigation'

export const HamburgerMenu = () => {
  const [toggleDisplayMenu, setToggleDisplayMenu] = useState('none')
  const hamburgerMenuRef = useRef<HTMLUListElement>(null)
  const { isAuthenticated } = useContext(UserContext)

  useEffect(() => window.addEventListener('resize', () => setToggleDisplayMenu('none')), [])

  const toggle = () => {
    hamburgerMenuRef.current?.style.display === 'none'
      ? setToggleDisplayMenu('block')
      : setToggleDisplayMenu('none')
  }

  return (
    <>
      <div className={styles.hamburger} onClick={toggle}></div>
      {
        isAuthenticated
          ? (
            <ul ref={hamburgerMenuRef} className={styles.hamburgerMenu} style={{ display: toggleDisplayMenu }}>
              {navigation.map((link, index) => (
                <li key={index}>
                  <Link to={`/${link.value}`} className={styles[link.value]}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          )
          : (
            <ul ref={hamburgerMenuRef} className={styles.hamburgerMenu} style={{ display: toggleDisplayMenu }}>
              {notLoggedNavigation.map((link, index) => (
                <li key={index}>
                  <Link to={`/${link.value}`} className={styles[link.value]}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          )
      }
    </>
  )
}
