import styles from "./ServiceItem.module.css"

function ServiceItem({ service, onRequestDelete, onRequestEdit }) {
  return (
    <div className={styles.row}>
      <p className={styles.name}>{service.name}</p>
      <div className={styles.actions}>
        <div className={styles.checkbox}>
          <label>Показники: </label>
          <input type="checkbox" checked={service.hasMeter} readOnly />
        </div>
        <button className={styles.updateButton} onClick={() => onRequestEdit(service)}>Редагувати</button>
        <button className={styles.deleteButton} onClick={() => onRequestDelete(service.id)}>Видалити</button>
      </div>
    </div>
  )
}

export default ServiceItem