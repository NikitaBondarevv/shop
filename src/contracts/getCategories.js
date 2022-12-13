export const getCategories = async () => {
  const response = await fetch('http://localhost:8086/shop_info', { credentials: 'include' })
  
  return await response.json()
}
