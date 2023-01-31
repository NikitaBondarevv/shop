import { useState } from 'react'
import { Link } from 'react-router-dom'

import { WarningWindow } from 'components/warningWindow'
import { TPublishItemsProps, TTarget } from './types'
import editIcon from './images/edit.png'
import deleteIcon from './images/delete.png'
import styles from './styles.css'
import { EditableText } from 'components/editableText'
import { ICategory } from 'interfaces/ICategories'

export const PublishItems = ({
  title,
  publishListTitle,
  listTitle,
  items,
  onRemove,
  description,
  showEditButton,
  onPublish,
  postingMessage,
  listMessage,
  onRename,
  create,
  textForEditable,
  onSave
}: TPublishItemsProps) => {
  const published = items?.filter(data => data.published)
  const [value, setValue] = useState('')
  const [editIndex, setEditIndex] = useState(-1)
  const unpublished = items?.filter(data => !data.published && (!value || data.title.includes(value)))
  const [id, setId] = useState<number | undefined>(undefined)
  const [valueEdit, setValueEdit] = useState('')



  const searchCategory = ({ target: { value } }: TTarget) => {
    setValue(value)
  }

  const onConfirm = () => {
    const item = items.find(data => data.id === id)

    onRemove!(item!)
    setId(undefined)
  }

  const onBlur = (data: ICategory, name: string) => {
    onRename!(data, name)
    setEditIndex(-1)
  }

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>
        {title}
        {
          create &&
          <EditableText
            text={textForEditable}
            className={styles.editableText}
            onBlur={(name) => setValueEdit(name)}
          />
        }
      </h1>
      <div className={styles.categories}>
        <div className={styles.published}>
          <span>
            {publishListTitle}
          </span>
          <ul>
            {
              !published?.length
                ? <span>{postingMessage}</span>
                : published?.map(data => (
                  <li className={styles.category} key={data.id}>
                    <Link to={`${data.title}`}>
                      <EditableText
                        text={data.title.toUpperCase()}
                        isEdit={editIndex === data.id}
                        onBlur={(name: string) => onBlur(data, name)}
                      />
                    </Link>
                    <div className={styles.buttons}>
                      {
                        !showEditButton && (
                          <button className={styles.edit} onClick={() => setEditIndex(data.id)}>
                            <img src={editIcon} alt="edit" />
                          </button>
                        )
                      }
                      <button className={styles.delete} onClick={() => setId(data.id)}>
                        <img src={deleteIcon} alt="delete" />
                      </button>
                    </div>
                  </li>
                ))
            }
          </ul>
          {
            create
              ? <Link className={styles.addNew} onClick={() => onSave!(valueEdit)} to={`/categories/${valueEdit}`}>SAVE</Link>
              : <Link className={styles.addNew} to="/new">ADD NEW</Link>
          }
        </div>
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
          <ul>
            {
              !unpublished?.length
                ? <span>{listMessage}</span>
                : unpublished?.map(data => (
                  <li key={data.id} onDoubleClick={() => onPublish!(data)}>
                    {data.title}
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
      {
        id && <WarningWindow description={description} onConfirm={() => onConfirm()} onCancel={() => setId(undefined)} />
      }
    </div>
  )
}