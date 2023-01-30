export type TEditableText = {
  multiLine: boolean
  price?: boolean
  text: string
  isEdit?: boolean
  onBlur?: (value: string) => void
}

export type TTarget = {
  target: {
    value: string
  }
}
