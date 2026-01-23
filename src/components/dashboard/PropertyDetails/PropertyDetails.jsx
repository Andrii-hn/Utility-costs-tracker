import styles from "./PropertyDetails.module.css"

function PropertyDetails({ property }) {
  
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{property.name}</h2>
      <p className={styles.location}>{property.city}, {property.address}</p>
      <p className={styles.meta}>Створено: {new Date(property.createdAt).toLocaleString("uk-UA")}</p>
    </div>
  )
}

export default PropertyDetails