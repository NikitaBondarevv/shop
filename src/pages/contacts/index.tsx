import styles from './styles.css'

export const Contacts = () => (
  <div className={styles.contacts}>
    <h1>Give Feedback to Our Website.</h1>
    <form action="mailto:nikita.bondarev1807@gmail.com" method="get" encType="text/plain">
      <label htmlFor="name" className={styles.name}>
        Name: <input type="text" name="name" />
      </label>
      <label htmlFor="email">
        Email: <input type="text" name="email" />
      </label>
      <div>
        <label>Comments:</label>
        <br />
        <textarea name="comments" placeholder="Send your comments to us." />
      </div>
      <div>
        <input type="submit" name="submit" value="Send" />
        <input type="reset" name="reset" value="Clear Form" />
      </div>
    </form>
  </div>
)
