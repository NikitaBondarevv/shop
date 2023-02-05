import { useState } from 'react'
import { Link } from 'react-router-dom'

import { navigation } from 'helpers/navigation'
import { THamburgerMenu } from './types'
import styles from './styles.css'

export const HamburgerMenu = ({ setMarginHeader }: THamburgerMenu) => {
  const [toggleMenu, setToggleMenu] = useState(false)

  window.addEventListener('resize', () => {
    setToggleMenu(false)
    setMarginHeader(60)
  })

  const toggle = () => {
    setToggleMenu(!toggleMenu)
    
    toggleMenu ? setMarginHeader(60) : setMarginHeader(200)
  }

  return (
    <>
      <div className={styles.hamburger} onClick={toggle}></div>
      {
        toggleMenu && (
          <ul className={styles.hamburgerMenu}>
            {navigation.map((link, index) => (
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
