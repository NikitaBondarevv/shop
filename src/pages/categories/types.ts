import { ICategory } from 'interfaces/ICategories'

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
