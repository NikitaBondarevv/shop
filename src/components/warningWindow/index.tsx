import { TWarningWindow } from './types'
import close from './images/close.png'
import styles from './styles.css'

export const WarningWindow = ({ description, onCancel, onConfirm }: TWarningWindow) => (
  <div className={styles.warningWindow}>
    <div className={styles.window}>
      <button onClick={onCancel} className={styles.close}>
        <img src={close} alt="close" />
      </button>
      <h1>Warning</h1>
      <p>
        {description}
      </p>
      <div className={styles.buttons}>
        <button type='button' onClick={onConfirm}>
          OK
        </button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)