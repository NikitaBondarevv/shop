import styles from './styles.css'
import logo from './images/logo.png'
import loginPage from './images/loginPage.png'

export const Header = () => {
  const links = [
    { text: 'Home', value: 'home' },
    { text: 'Shop', value: 'shop' },
    { text: 'Contacts', value: 'contacts' }
  ]

  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
        <img src={logo} className={styles.logo} alt="logo" />
        <nav>
          <ul className={styles.list}>
            {links.map((link, index) => (
              <li key={index}>
                <a href="/#" className={styles[`${link.value}`]}>{link.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.loginPanel}>
        <img src={loginPage} alt="login page" />
        <a>Sign In</a>
        <span>/</span>
        <a>Sign Up</a>
      </div>
    </header>
  )
}
