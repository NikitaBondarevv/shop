import { Dispatch, SetStateAction } from 'react'

import { IProduct } from 'interfaces/IProduct'

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
  categories: IProduct[]
  setCategories: Dispatch<SetStateAction<IProduct[]>>
}

export type TNoAuthorisedProps = {
  categories: IProduct[]
}
