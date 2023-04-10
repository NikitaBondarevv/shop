export type TProduct = {
  onSave: (title: string, price: string, description: string) => Promise<void>
  title?: string
  price: string
  description?: string
}
