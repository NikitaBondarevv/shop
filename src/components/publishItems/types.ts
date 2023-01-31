export type TPublishItemsProps<T> = {
  title: string
  publishListTitle?: string
  listTitle?: string
  items: T[]
  onRemove?: (item: T) => Promise<void>
  getDescription: (id: number) => string
  showEditButton?: boolean
  onPublish?: (data: T) => Promise<void>
  postingMessage: string
  listMessage: string
  onRename?: (data: T, name: string) => Promise<void>
  create?: boolean
  textForEditable?: string
  onSave?: (name: string) => Promise<void>
  filterPredicate: (data: T) => boolean
}

export type TTarget = {
  target : {
    value: string
  }
}
