import styles from "./PropertyDetails.module.css"

function PropertyDetails({ property }) {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>{property.name}</h2>
          <p className={styles.location}>{property.city}, {property.address}</p>
        </div>

        <div className={styles.meta}>
          Створено: {new Date(property.createdAt).toLocaleString("uk-UA")}
        </div>
      </div>

      <div className={styles.placeholder}>
        <p>Тут з'являться комунальні послуги та витрати</p>
      </div>
    </div>
  )
}

export default PropertyDetails