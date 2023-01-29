import { Dispatch, SetStateAction } from 'react'

import { ICategory } from 'interfaces/ICategories'

export type TPublishItemsProps = {
  className: string
  anotherName: string
  name: string
  items: ICategory[]
  onRemove: () => void
  description: string
  setId: Dispatch<SetStateAction<number | undefined>>
  id: number | undefined
  products?: boolean
  onPublished?: () => void
  message: string
  anotherMessage: string
  setIdUnPublish?: Dispatch<SetStateAction<number | undefined>>
  onRename: () => void
  edit: boolean
}

export type TTarget = {
  target : {
    value: string
  }
}
