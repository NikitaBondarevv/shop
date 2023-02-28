export type TPublishItemsProps<T> = {
  title?: string
  publishListTitle?: string
  listTitle?: string
  items: T[]
  onRemove?: (data: T) => Promise<void>
  getWarningDescription: (id: number) => string
  showEditButton?: boolean
  onPublish?: (data: T) => Promise<void>
  noAllItemsMessage: string
  noFilteredItemsMessage: string
  onRename?: (data: T, name: string) => Promise<void>
  create?: boolean
  valueEdit?: string
  onSave?: (name: string) => Promise<void>
  filterPredicate: (data: T) => boolean
  viewMode?: boolean
  getLink: (data: T) => string
  showAddNewButton?:boolean
}
