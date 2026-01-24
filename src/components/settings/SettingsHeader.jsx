import styles from "./SettingsHeader.module.css"

function SettingsHeader({ onOpenAddService }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Налаштування комунальних послуг</h1>
      <button 
        className={styles.button} 
        // onClick={onOpenAddService}
      >
        Додати послугу
      </button>
    </div>
  )
}

export default SettingsHeader 