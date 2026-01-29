import styles from "./PropertyItem.module.css"

function PropertyItem({ property, isExpanded, onToggle, onOpen }) {
  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("uk-UA");
  }
  return (
    <>
      <div className={`${styles.item} ${isExpanded ? styles.active : ""}`}>
        <div className={styles.header} onClick={onToggle}>
          <p className={styles.name}>{property.name}</p>
          <p className={styles.location}>{property.city}, {property.address}</p>
        </div>

        {onOpen && ( 
          <div>
            <button onClick={onOpen}>Відкрити</button>
          </div>
        )}

        {isExpanded && (
          <div className={styles.expanded}>
            <p className={styles.meta}>
              Створено: {formatDate(property.createdAt)}
            </p>
            <button className={styles.action}>
              Перейти до витрат
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default PropertyItem