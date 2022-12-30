import { FormEvent, useState } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import msg from './images/msg-element.png'
import { fields } from './registerFields'
import { TUserForm, TTarget, TRegisterFields } from './types'
import { IUser } from 'interfaces/IUser'

export const UserForm = ({ disabledFields, user, onSubmit }: TUserForm) => {
  const [registerFields, setRegisterFields] = useState<TRegisterFields>(fields.reduce<TRegisterFields>((prev, next) =>
  (prev[next.label] = { value: user[next.label as keyof IUser] ?? '' }) && prev,
  {}))

  const setValue = ({ target: { value, name } }: TTarget) => {
    setRegisterFields(registerFields => ({
      ...registerFields,
      [name]: { value }
    }))
  }

  const validate = ({ target: { value, name } }: TTarget, index: number) => {
    const { reg } = fields[index]

    if (['passwordRepeat', 'password'].includes(name) && registerFields.passwordRepeat.value &&
      registerFields.passwordRepeat.value !== registerFields.password.value) {
      setRegisterFields(registerFields => ({
        ...registerFields,
        passwordRepeat: {
          [name]: value,
          error: 'Passwords are not matched'
        }
      }))

      return
    }

    setRegisterFields(registerFields => ({
      ...registerFields,
      [name]: {
        value,
        error: reg.test(value) ? '' : `${name.replace(/[A-Z]/, letter => ` ${letter.toLowerCase()}`)} is incorrect`
      }
    }))
  }

  const canSubmit = () => !fields.some(({ label, reg }) => {
    if (!registerFields[label].value) {
      return true
    }

    return !reg.test(registerFields[label].value)
  })

  const save = (e: FormEvent) => {
    e.preventDefault()

    if (!canSubmit()) {
      return
    }

    const data = Object.entries(registerFields).reduce((user, [key, { value }]) => {
      user[key as keyof IUser] = value

      return user
    }, {} as IUser)

    onSubmit(data)
  }

  return (
    <form className={styles.loginForm} onSubmit={save}>
      <ul>
        {fields.map((field, index) => {
          const stateField = registerFields[field.label]

          return (
            <li key={field.label} className={styles[field.label]}>
              <input type={field.secure ? 'password' : 'text'}
                name={field.label}
                className={stateField.error ? styles.error : styles.success}
                placeholder={field.label.toUpperCase()}
                value={stateField.value}
                onChange={setValue}
                onBlur={e => validate(e, index)}
                disabled={disabledFields.includes(field.label)}
              />
              {stateField.error && <div className={styles.info}><img src={msg} /><span className={styles.textInfo}>{stateField.error}</span></div>}
            </li>
          )
        }
        )}
      </ul>
      <input type="submit" value="SAVE" disabled={!canSubmit()} />
    </form>
  )
}

UserForm.defaultProps = {
  disabledFields: [],
  user: {}
}

UserForm.propTypes = {
  disabledFields: PropTypes.array,
  user: PropTypes.object
}
