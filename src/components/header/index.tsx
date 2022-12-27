import styles from './styles.css'
import logo from './images/logo.png'
import loginPage from './images/loginPage.png'
import { links } from 'helpers/links'

export const Header = () => (
  <header className={styles.header}>
    <a href="/">
      <img src={logo} className={styles.logo} alt="logo" />
    </a>
    <nav>
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={`/${link.value}`} className={styles[`${link.value}`]}>{link.text}</a>
          </li>
        ))}
      </ul>
    </nav>
    <div className={styles.loginPanel}>
      <img src={loginPage} alt="login page" />
      <a>Sign In</a>
      <span>/</span>
      <a>Sign Up</a>
    </div>
  </header>
)
