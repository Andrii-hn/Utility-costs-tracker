import styles from "./Header.module.css"

function Header({ onLoginClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Bills & Costs
        </div>

        <button
          className={styles.loginButton}
          onClick={onLoginClick}>
            Увійти
        </button>
      </div>
    </header>
  )
}

export default Header