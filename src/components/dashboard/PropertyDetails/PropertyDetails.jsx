import styles from "./PropertyDetails.module.css"

import { formatDate } from "../../../utils/date"

function PropertyDetails({ property, totalAmountForProperty }) {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.row}>
          <div className={styles.header}>
            <h2 className={styles.title}>{property.name}</h2>
            <p className={styles.location}>{property.city}, {property.address}</p>
          </div>
        </div>

        <div className={styles.meta}>
          Створено: {formatDate(property.createdAt)}
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails