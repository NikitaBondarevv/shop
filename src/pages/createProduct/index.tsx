import { EditableProduct } from 'components/editableProduct'
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
    <EditableProduct onSave={handleSave} title="NEW PRODUCT" price="0" />
  )
}
