import { useState, useRef, useEffect, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import { TEditableText, TTarget } from './types'

export const EditableText = ({ multiLine, text, isEdit, onBlur, className }: TEditableText) => {
  const [hidden, setHidden] = useState(true)
  const [value, setValue] = useState(text)
  const spanRef = useRef<HTMLElement>(null)
  const [inputWidth, setInputWidth] = useState(15)
  const [inputHeight, setInputHeight] = useState(25)

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
    onBlur!(value)
  }

  const showInput = () => {
    setInputWidth(spanRef.current!.clientWidth + 5)
    setInputHeight(spanRef.current!.clientHeight + 5)

    setHidden(false)
  }
  
  const handleKeyDown = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  if (hidden) return <span
    ref={spanRef}
    className={styles.text}
    onClick={showInput}>
    {value || text}
  </span>

  return multiLine
    ? (
      <textarea
        name="description"
        className={styles.description}
        onChange={setValueInput}
        onBlur={handleBlur}
        value={value}
        autoFocus
        style={{
          width: `${inputWidth}px`,
          height: `${inputHeight}px`
        }}
      />
    )
    : (
      <input
        className={`${styles.textInput} ${className}`}
        name="text"
        value={value}
        onChange={setValueInput}
        onBlur={handleBlur}
        autoFocus
        style={{
          width: `${inputWidth}px`,
          height: `${inputHeight}px`
        }}
        onKeyDown={handleKeyDown}
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
