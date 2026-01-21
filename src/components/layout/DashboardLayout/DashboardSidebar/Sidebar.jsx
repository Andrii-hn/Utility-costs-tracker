import { NavLink } from "react-router-dom"
import { LayoutDashboard, Home, Receipt } from "lucide-react";

import styles from "./Sidebar.module.css"

function Sidebar() {
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
        <NavLink to="/dashboard/properties" className={linkClass}>
          <Home size={18} />
          Об'єкти нерухомості
        </NavLink>
        <NavLink to="/dashboard/costs" className={linkClass}>
          <Receipt size={18} />
          Комунальні витрати
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar