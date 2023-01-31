export const getNavLinkName = (isActive: boolean, value: string = '', styles: { [key: string]: string; }) => {
  const activeClassName = isActive ? styles.active : ''

  return `${value} ${activeClassName}`
}
