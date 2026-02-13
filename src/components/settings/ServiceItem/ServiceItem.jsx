import styles from "./ServiceItem.module.css"

function ServiceItem({ service, onRequestDelete, onRequestEdit }) {
  return (
    <div className={styles.row}>
      <p className={styles.name}>{service.name}</p>
      <div className={styles.actions}>
        <div className={styles.checkbox}>
          <label>Показники: </label>
          <span style={{
            color: service.hasMeter ? "#16a34a" : "#dc2626",
            fontWeight: 600,
            fontSize: "1.2rem"
          }}>
            {service.hasMeter ? "✔" : "✖" }
          </span>
        </div>
        <div className={styles.actionsButtons}>
          <button className={styles.updateButton} onClick={() => onRequestEdit(service)}>Редагувати</button>
          <button className={styles.deleteButton} onClick={() => onRequestDelete(service.id)}>Видалити</button>
        </div>
      </div>
    </div>
  )
}

export default ServiceItem