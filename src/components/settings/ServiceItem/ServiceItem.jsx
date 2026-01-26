import styles from "./ServiceItem.module.css"

function ServiceItem({ service }) {
  return (
    <div className={styles.row}>
      <p className={styles.name}>{service.name}</p>
      <div className={styles.actions}>
        <div className={styles.checkbox}>
          <label>Показники: </label>
          <input type="checkbox" checked={service.hasMeter} readOnly />
        </div>
        <button className={styles.updateButton}>Редагувати</button>
        <button className={styles.deleteButton}>Видалити</button>
      </div>
    </div>
  )
}

export default ServiceItem