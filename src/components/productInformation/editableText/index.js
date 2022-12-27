import { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export const EditableText = ({ multiLine, stylesInput, text }) => {
  const [hidden, setHidden] = useState(true)
  const [value, setValue] = useState(text)

  const setValueInput = ({ target: { value } }) => {
    setValue(value)
  }

  const handleBlur = e => {
    e.preventDefault()

    setHidden(true)
  }

  const showInput = () => {
    setHidden(false)
  }

  if (hidden) return <span className={styles.text} onClick={showInput}>{value ? value : text}</span>

  return multiLine
    ? (
      <textarea
        name="description"
        className={styles.description}
        onChange={setValueInput}
        onBlur={handleBlur}
        value={value}
        autoFocus
      />
    )
    : (
      <input
        className={stylesInput}
        name="text"
        value={value}
        onChange={setValueInput}
        onBlur={handleBlur}
        autoFocus
      />
    )
}

EditableText.defaultProps = {
  multiLine: false,
  stylesInput: '',
  text: ''
}

EditableText.propTypes = {
  multiLine: PropTypes.bool,
  stylesInput: PropTypes.string,
  text: PropTypes.string
}
