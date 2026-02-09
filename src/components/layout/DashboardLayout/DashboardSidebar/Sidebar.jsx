import { NavLink } from "react-router-dom"
import { LayoutDashboard, Home } from "lucide-react";

import styles from "./Sidebar.module.css"

function Sidebar({ properties, onOpenAddProperty }) {
  const linkClass = ({ isActive }) => 
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <aside className={styles.root}>
      <div className={styles.brand}>
        <NavLink to="/dashboard" end>
          Utility-costs-tracker
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/dashboard" end className={linkClass}>
          <LayoutDashboard size={18} />
          Огляд
        </NavLink>
        <NavLink to="/dashboard/service-settings" className={linkClass}>
          <Home size={18} />
          Налаштування послуг
        </NavLink>
      </nav>
      <div className={styles.container}>
        <h2 className={styles.title}>Мої об'єкти</h2>
        <div className={styles.properties}>
          {properties.length === 0 ? (
            <div className={styles.empty}>
              Cписок порожній. <br />
              Створіть об'єкт
            </div>
          ) : (
            <>
              {properties.map((property) => (
                <NavLink 
                  to={`/dashboard/property/${property.id}`} 
                  key={property.id}
                  className={({ isActive }) => 
                    `${styles.item} ${isActive ? styles.itemActive : ''}`
                  }>
                    {property.name}
                </NavLink>
              ))}
            </>
          ) }
        </div>
        <button 
          className={styles.addButton} 
          onClick={() => onOpenAddProperty()}
        >Додати об'єкт</button>
      </div>
    </aside>
  )
}

export default Sidebar