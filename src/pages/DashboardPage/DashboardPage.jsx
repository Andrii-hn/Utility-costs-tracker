import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom";

import styles from "./DashboardPage.module.css"

function DashboardPage() {
  const navigate = useNavigate();
  const { properties, onOpenAddProperty } = useOutletContext();
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Мої об'єкти</h1>
        <button 
          className={styles.primaryButton}
          onClick={() => onOpenAddProperty(true)}
        >Створити об'єкт</button>
      </header>
      <section className={styles.content}>
        {properties.length === 0
          ? (
            <div className={styles.empty}>
              <div className={styles.emoji}>🏠</div>
              <h2 className={styles.title}>У вас ще немає об'єктів</h2>
              <p className={styles.hint}>Створіть перший об'єкт, щоб почати</p>
              <button
                className={styles.primaryButton}
                onClick={() => onOpenAddProperty(true)}>Створити об'єкт</button>
            </div>
          ) : (
            properties.map((property) => (
              <div
                key={property.id}  
                onClick={() => navigate(`property/${property.id}`)}
                className={styles.item}
              >
                <h1 className={styles.name}>{property.name}</h1>
                <p className={styles.address}>{property.city}, {property.address}</p>
              </div>
            ))
          )
        }
      </section>
    </div>
  )
}

export default DashboardPage 