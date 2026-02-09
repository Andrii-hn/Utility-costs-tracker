import UserMenu from "../UserMenu/UserMenu"

import styles from "./Header.module.css"

function Header({ user, onLogout }) {
  return (
    <header className={styles.root}>
      <div className={styles.userArea}>
        <UserMenu onLogout={onLogout} email={user?.email} user={user}/>
      </div>
    </header>
  )
}

export default Header