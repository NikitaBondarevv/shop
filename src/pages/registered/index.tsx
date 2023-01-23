import { Link } from 'react-router-dom'

import styles from './styles.css'

export const Registered = () => (
  <div className={styles.registered}>
    <span>
      Account was successfully created.
    </span>
    <p>
      Now you can use your email and password to login into profile.
    </p>
    <Link to="/signIn">Go to main page</Link>
  </div>
)
