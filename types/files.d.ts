declare module '*.css' {
  const classNames: { [key: string]: string }
  export = classNames
}

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}
