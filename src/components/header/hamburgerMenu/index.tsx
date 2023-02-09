import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { navigation } from 'helpers/navigation'
import styles from './styles.css'
import { UserContext } from 'contexts/userContext'
import { notLoggedNavigation } from 'helpers/notLoggedNavigation'

export const HamburgerMenu = () => {
  const [toggleDisplayMenu, setToggleDisplayMenu] = useState('none')
  const hamburgerMenuRef = useRef<HTMLUListElement>(null)
  const divFirstHamburger = useRef<HTMLDivElement>(null)
  const divTwoHamburger = useRef<HTMLDivElement>(null)
  const divLastHamburger = useRef<HTMLDivElement>(null)
  const { isAuthenticated } = useContext(UserContext)
  const [opacityDivHamburger, setOpacityDivHamburger] = useState('')
  const [rotateFirstDivHamburger, setRotateFirstDivHamburger] = useState('')
  const [rotateLastDivHamburger, setRotateLastDivHamburger] = useState('')


  useEffect(() => window.addEventListener('resize', () => setToggleDisplayMenu('none')), [])

  const toggle = () => {
    hamburgerMenuRef.current?.style.display === 'none'
      ? setToggleDisplayMenu('block')
      : setToggleDisplayMenu('none')

    divFirstHamburger.current?.style.opacity === ''
      ? setOpacityDivHamburger('0')
      : setOpacityDivHamburger('')

    divTwoHamburger.current?.style.transform === ''
      ? setRotateFirstDivHamburger('45deg')
      : setRotateFirstDivHamburger('')

    divLastHamburger.current?.style.transform === ''
      ? setRotateLastDivHamburger('-45deg')
      : setRotateLastDivHamburger('')
  }

  return (
    <>
      <button className={styles.hamburger} onClick={toggle}>
        <div ref={divFirstHamburger} style={{ transform: divFirstHamburger.current?.style.transform === '' ? `rotate(${rotateFirstDivHamburger})` : '' }} />
        <div ref={divTwoHamburger} style={{ opacity: divTwoHamburger.current?.style.opacity === '' ? opacityDivHamburger : '' }} />
        <div ref={divLastHamburger} style={{ transform: divLastHamburger.current?.style.transform === '' ? `rotate(${rotateLastDivHamburger})` : '' }} />
      </button>
      {
        isAuthenticated
          ? (
            <ul ref={hamburgerMenuRef} className={styles.hamburgerMenu} style={{ display: toggleDisplayMenu }}>
              {navigation.map((link, index) => (
                <li key={index}>
                  <Link to={`/${link.value}`} className={styles[link.value]} onClick={() => setToggleDisplayMenu('none')}>
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
                  <Link to={`/${link.value}`} className={styles[link.value]} onClick={() => setToggleDisplayMenu('none')}>
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
