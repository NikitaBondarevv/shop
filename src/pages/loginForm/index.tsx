import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import { login } from 'contracts/login'
import { TLoginFormProps } from './types'
import styles from './styles.css'
import { Preloader } from 'components/preloader'

export const LoginForm = ({ setUser }: TLoginFormProps) => {
  const [isLoading, setIsloading] = useState(false)
  const navigate = useNavigate()
  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    const {
      currentTarget: {
        elements
      }
    } = e

    const { email, password } = elements as unknown as Record<string, HTMLInputElement>

    e.preventDefault()
    setIsloading(true)

    const user = await login(email.value, password.value)

    setUser(user)
    navigate('/')

    setIsloading(false)
  }

  return (
    <form onSubmit={submitHandler} className={styles.loginForm}>
      <input type="text" placeholder="Email" name="email" />
      <div className={styles.password}>
        <input type="password" placeholder="Password" name="password" />
      </div>
      <button type='submit' disabled={isLoading}>
        {isLoading ? <Preloader size={80} className={styles.preloader} /> : 'Login'}
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func
}
