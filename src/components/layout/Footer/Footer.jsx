import styles from "./Footer.module.css"

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {year} Bills & Costs. Навчальний проект.
        </p>
      </div>
    </footer>
  )
}

export default Footer