import { Outlet } from "react-router-dom"

import Sidebar from "./DashboardSidebar/Sidebar"
import Header from "./DashboardHeader/Header"

import styles from "./DashboardLayout.module.css"

function DashboardLayout({ onLogout, user, properties, setProperties }) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <div className={styles.main}>
        <div className={styles.header}>
            <Header onLogout={onLogout} user={user}/>
        </div>
        <main className={styles.content}>
            <Outlet context={{ user, properties, setProperties}} />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout