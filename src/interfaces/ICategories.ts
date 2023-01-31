import { IProduct } from "./IProduct"

export interface ICategory {
  title: string
  id: number
  published?: boolean
  products?: IProduct[]
}
