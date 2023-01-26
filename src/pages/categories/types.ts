import { IProduct } from 'interfaces/IProduct'
import { ICategory } from 'interfaces/ICategories'

export type TCategory = {
  id: number
  products?: IProduct[]
  published: boolean
  title: string
}

export type TTarget = {
  target : {
    value: string
  }
}

export type TAuthorisedProps = {
  categories: ICategory[]
  getData: () => void
}

export type TNoAuthorisedProps = {
  categories: ICategory[]
}
