import { useState } from 'react'
import { Link } from 'react-router-dom'

import { WarningWindow } from 'components/warningWindow'
import { TPublishItemsProps, TTarget } from './types'
import editIcon from './images/edit.png'
import deleteIcon from './images/delete.png'
import styles from './styles.css'
import { EditableText } from 'components/editableText'

export const PublishItems = ({
  className,
  anotherName,
  name,
  items,
  onRemove,
  description,
  setId,
  setIdUnPublish,
  id,
  products,
  onPublished,
  message,
  anotherMessage,
  onRename,
  edit
}: TPublishItemsProps) => {
  const published = items?.filter(data => data.published)
  const [value, setValue] = useState('')
  const unpublished = items?.filter(data => !data.published && (!value || data.title.includes(value)))

  const searchCategory = ({ target: { value } }: TTarget) => {
    setValue(value)
  }

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>
        {className}
      </h1>
      <div className={styles.categories}>
        <div className={styles.published}>
          <span>
            {anotherName}
          </span>
          <ul>
            {
              !published?.length
                ? <span>{message}</span>
                : published?.map(data => (
                  <li className={styles.category} key={data.id}>
                    {
                      edit ? <EditableText text={data.title.toUpperCase()} /> :
                        <Link to={`${data.title}`}>
                          {data.title.toUpperCase()}
                        </Link>
                    }
                    <div className={styles.buttons}>
                      {
                        !products && (
                          <button className={styles.edit} onClick={() => onRename()}>
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
          <Link className={styles.addNew} to="/new">ADD NEW</Link>
        </div>
        <div className={styles.noPublished}>
          <span>
            {name}
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
                ? <span>{anotherMessage}</span>
                : unpublished?.map(data => (
                  <li key={data.id} onDoubleClick={onPublished} onClick={() => setIdUnPublish!(data.id)}>
                    {data.title}
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
      {
        id && <WarningWindow description={description} onConfirm={() => onRemove()} onCancel={() => setId(undefined)} />
      }
    </div>
  )
}
