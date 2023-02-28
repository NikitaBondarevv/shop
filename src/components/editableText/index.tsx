import { useState, useRef, useEffect, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import { TEditableText, TTarget } from './types'

export const EditableText = ({ multiLine, text, isEdit, onBlur, className }: TEditableText) => {
  const [hidden, setHidden] = useState(true)
  const [value, setValue] = useState(text)
  const spanRef = useRef<HTMLElement>(null)
  const [inputWidth, setInputWidth] = useState(15)
  const [borderTextarea, setBorderTextarea] = useState('1px solid transparent')

  useEffect(() => {
    setValue(text)
  }, [text])

  useEffect(() => {
    if (isEdit) showInput()
  }, [isEdit])

  const setValueInput = ({ target: { value } }: TTarget) => {
    setValue(value)
  }

  const handleBlur = () => {
    setHidden(true)
    onBlur(value)
    setBorderTextarea('1px solid transparent')
  }

  const showInput = () => {
    setInputWidth(spanRef.current!.clientWidth + 5)

    setHidden(false)
  }

  const showTextarea = () => {
    setBorderTextarea('1px solid rgb(202, 202, 202)')
  }

  const handleKeyDown = ({ key }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (key === 'Enter') handleBlur()
    if (key === 'Escape') {
      setValue(text)
      setHidden(true)
      onBlur(text)
    }
  }

  if (multiLine) return (
    <textarea
      name="description"
      className={styles.description}
      onChange={setValueInput}
      onBlur={handleBlur}
      value={value}
      placeholder="Put your description here"
      onKeyDown={handleKeyDown}
      onClick={showTextarea}
      style={{
        border: borderTextarea
      }}
    />
  )

  if (hidden) return (
    <span
      ref={spanRef}
      className={`${styles.text} ${className}`}
      onClick={showInput}>
      {value || text}
    </span>
  )

  return (
    <input
      className={styles.textInput}
      name="text"
      value={value}
      onChange={setValueInput}
      onBlur={handleBlur}
      autoFocus
      style={{
        width: `${inputWidth}px`
      }}
      onKeyDown={handleKeyDown}
    />
  )
}

EditableText.defaultProps = {
  multiLine: false,
  stylesInput: '',
  text: '',
  className: ''
}

EditableText.propTypes = {
  multiLine: PropTypes.bool,
  stylesInput: PropTypes.string,
  text: PropTypes.string,
  onBlur: PropTypes.func,
  className: PropTypes.string
}
