import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import styles from "./PublicLayout.module.css"

function PublicLayout({ children, onLoginClick }) {
  return (
    <div className={styles.layout}>
      <Header onLoginClick={onLoginClick} />

      <main className={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default PublicLayout