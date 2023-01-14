import { IProduct } from 'interfaces/IProduct'

export type TCategory = {
  id: number
  products?: IProduct[]
  published: boolean
  title: string
}
