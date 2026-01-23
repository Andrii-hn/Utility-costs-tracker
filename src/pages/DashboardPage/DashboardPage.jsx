import { useOutletContext } from "react-router-dom"

import PropertyDetails from "../../components/dashboard/PropertyDetails/PropertyDetails";

import styles from "./DashboardPage.module.css"

function DashboardPage() {
  const { properties, selectedPropertyId, onOpenAddProperty } = useOutletContext();
  const selectedProperty = properties.find((property) => property.id === selectedPropertyId);
  if (selectedPropertyId === null) {
    return (
      <div className={styles.empty}>
        <p className={styles.emoji}>🏠</p>
        <p className={styles.hint}>Оберіть об'єкт у з колонки</p>
        <span className={styles.or}>або</span>
        <button
          className={styles.primaryButton}
          onClick={() => onOpenAddProperty(true)}>Створіть новий</button>
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