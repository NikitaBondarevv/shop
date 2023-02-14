import { ProductItems } from 'components/productItems'
import { createProduct } from 'contracts/products'

export const CreateProduct = () => {
  const handleSave = async (title: string, price: string, description: string) => {
    await createProduct({
      title,
      price,
      description,
    })
  }

  return (
    <ProductItems onSave={handleSave} title="NEW PRODUCT" price="0" description="Add some brief description here." />
  )
}
