import { IProduct } from "./IProduct"

export interface ICategory {
  title: string
  id: number
  published?: boolean
  products?: IProduct[]
}

export interface ICategoryCreate {
  title: string
  published?: boolean
  products?: IProduct[]
}
