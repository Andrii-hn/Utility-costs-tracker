import { useOutletContext } from "react-router-dom"

import PropertyDetails from "../../components/dashboard/PropertyDetails/PropertyDetails";

import styles from "./DashboardPage.module.css"

function DashboardPage() {
  const { properties, selectedPropertyId, onOpenAddProperty } = useOutletContext();
  const selectedProperty = properties.find((property) => property.id === selectedPropertyId);
  if (selectedPropertyId === null) {
    return (
      <div className={styles.empty}>
        <div className={styles.emoji}>🏠</div>
        <h2 className={styles.title}>Об'єкт не обрано</h2>
        <p className={styles.hint}>Оберіть об'єкт у з колонки або створіть новий</p>
        <button
          className={styles.primaryButton}
          onClick={() => onOpenAddProperty(true)}>Створити об'єкт</button>
      </div>
    )
  }
  
  return (
    <div>
      {selectedProperty && (
        <PropertyDetails property={selectedProperty} />
      )}
    </div>
  )
}

export default DashboardPage 