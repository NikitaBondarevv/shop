import { ChangeEvent, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { WarningWindow } from 'components/warningWindow'
import { TPublishItemsProps } from './types'
import { EditableText } from 'components/editableText'
import styles from './styles.css'
import { Edit } from './svgIcons/edit'
import { Delete } from './svgIcons/delete'

export function PublishItems<T extends { id: number, title: string }>({
  publishListTitle,
  listTitle,
  items,
  onRemove,
  getWarningDescription,
  showEditButton,
  onPublish,
  noAllItemsMessage,
  noFilteredItemsMessage,
  onRename,
  create,
  onSave,
  filterPredicate,
  valueEdit,
  viewMode,
  getLink,
  showAddNewButton
}: TPublishItemsProps<T>) {
  const published = items?.filter(filterPredicate)
  const [value, setValue] = useState('')
  const [editIndex, setEditIndex] = useState(-1)
  const unpublished = items?.filter(data => !filterPredicate(data) && (!value || data.title.includes(value)))
  const [removeId, setRemoveId] = useState<number | undefined>(undefined)
  const description = useMemo(() => getWarningDescription(removeId!), [removeId])

  const searchCategory = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value)
  }

  const onConfirm = () => {
    const item = items.find(data => data.id === removeId)

    onRemove!(item!)
    setRemoveId(undefined)
  }

  const onBlur = (data: T, name: string) => {
    onRename!(data, name)
    setEditIndex(-1)
  }

  return (
    <>
      <div className={styles.categories}>
        <div className={styles.published}>
          {
            viewMode && (
              <span>
                {publishListTitle}
              </span>
            )
          }
          {!published?.length
            ? <span>{noAllItemsMessage}</span>
            : <ul>
              {
                published?.map((data, index) => (
                  <li className={styles.category} key={data.id}>
                    <Link to={getLink!(data)}>
                      <EditableText
                        text={data.title.toUpperCase()}
                        isEdit={editIndex === index}
                        onBlur={(name: string) => onBlur(data, name)}
                      />
                    </Link>
                    {
                      viewMode && <div className={styles.buttons}>
                        {
                          !showEditButton && (
                            <button className={styles.edit} onClick={() => setEditIndex(index)}>
                              <Edit />
                            </button>
                          )
                        }

                        <button className={styles.delete} onClick={() => setRemoveId(data.id)}>
                          <Delete />
                        </button>
                      </div>
                    }
                  </li>
                ))
              }
            </ul>
          }
          {
            create
              ? <Link className={styles.addNew} onClick={() => onSave!(valueEdit!)} to={`/categories/${valueEdit}`}>SAVE</Link>
              : showAddNewButton && <Link className={styles.addNew} to="/new">ADD NEW</Link>
          }
        </div>
        {
          viewMode && (
            <div className={styles.noPublished}>
              <span>
                {listTitle}
              </span>
              <input
                className={styles.search}
                type="text"
                placeholder="SEARCH"
                value={value}
                onChange={searchCategory}
              />
              {
                !unpublished?.length
                  ? <span className={styles.noFilteredItemsMessage}>{noFilteredItemsMessage}</span>
                  : <ul>
                    {
                      unpublished?.map(data => (
                        <li key={data.id} onDoubleClick={() => onPublish!(data)}>
                          {data.title}
                        </li>
                      ))
                    }
                  </ul>
              }
            </div>
          )
        }
      </div>
      {
        removeId &&
        <WarningWindow
          description={description}
          onConfirm={() => onConfirm()}
          onCancel={() => setRemoveId(undefined)}
        />
      }
    </>
  )
}
