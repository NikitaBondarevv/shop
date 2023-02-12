import { IProduct } from "interfaces/IProduct"

export type TProduct = {
  onSave: (title: string, price: string, description: string) => Promise<void>
  product?: IProduct
  messageForDescription?: string
  create?: boolean
  title?: string
  price?: string
  description?: string
}
