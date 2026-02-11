import UserMenu from "../UserMenu/UserMenu"

import styles from "./Header.module.css"

function Header({ user, onLogout, onToggleSidebar }) {
  return (
    <header className={styles.root}>
      <button 
        onClick={() => onToggleSidebar()}
        className={styles.toggleButton}  
      >☰</button>
      <div className={styles.userArea}>
        <UserMenu onLogout={onLogout} email={user?.email} user={user}/>
      </div>
    </header>
  )
}

export default Header