import { deleteCategory } from 'contracts/deleteCategory'
import { TWarningWindow } from './types'
import close from './images/close.png'
import styles from './styles.css'

export const WarningWindow = ({ title, id, hideWarningWindow, getData }: TWarningWindow) => {
  const unpublishCategory = async (id: number) => {
    await deleteCategory(id)

    hideWarningWindow()
    getData()
  }

  return (
    <div className={styles.window}>
      <button onClick={hideWarningWindow} className={styles.close}>
        <img src={close} alt="close" />
      </button>
      <h1>Warning</h1>
      <p>
        You're going to unpublish "{title}" category.
        Press "Ok" to confirm. 
      </p>
      <div className={styles.buttons}>
        <button type='button' onClick={() => unpublishCategory(id)}>
          OK
        </button>
        <button type='button' onClick={hideWarningWindow}>
          Cancel
        </button>
      </div>
    </div>
  )
}
