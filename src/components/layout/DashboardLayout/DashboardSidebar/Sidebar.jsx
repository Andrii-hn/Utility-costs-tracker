import { NavLink } from "react-router-dom"
import { LayoutDashboard, Home, Receipt } from "lucide-react";


import styles from "./Sidebar.module.css"

function Sidebar({ properties, selectedPropertyId, onSelectProperty, onOpenAddProperty }) {
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
        <NavLink to="/dashboard/settings" className={linkClass}>
          <Home size={18} />
          Налаштування послуг
        </NavLink>
      </nav>
      <div className={styles.container}>
        <h2 className={styles.title}>Мої об'єкти</h2>
        <div className={styles.properties}>
        {properties.map((property) => (
            <div
              key={property.id} 
              onClick={() => onSelectProperty(property.id)}
              className={`${styles.item} ${property.id === selectedPropertyId ? styles.itemActive : ''}`}
              >
                {property.name}</div>
        ))}
        </div>
        <button className={styles.addButton} onClick={() => onOpenAddProperty()}>Додати об'єкт</button>
      </div>
    </aside>
  )
}

export default Sidebar