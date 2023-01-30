import { ICategory } from 'interfaces/ICategories'

export type TPublishItemsProps = {
  title: string
  publishListTitle?: string
  listTitle?: string
  items: ICategory[]
  onRemove?: (item: ICategory) => Promise<void>
  description: string
  showEditButton?: boolean
  onPublish?: (data: ICategory) => void
  message: string
  anotherMessage: string
  onRename?: (data: ICategory, name: string) => Promise<void>
  create?: boolean
  textForEditable?: string
  onSave?: (name: string) => Promise<void>
}

export type TTarget = {
  target : {
    value: string
  }
}
