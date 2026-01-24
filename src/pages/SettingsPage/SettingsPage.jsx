import { useOutletContext } from "react-router-dom"

import SettingsHeader from "../../components/settings/SettingsHeader"

import styles from "./SettingsPage.module.css"

function SettingsPage() {
  const { services } = useOutletContext()
  if (services.length === 0) {
    return (
      <div>
        <div className={styles.header}>
          <SettingsHeader 
            // onOpenAddService={onOpenAddService}
          />
        </div>
        <div className={styles.empty}>
          <h2 className={styles.title}>У вас поки немає комунальних послуг</h2>
          <p className={styles.desc}>Створіть послуги, які будуть доступні для всіх обʼєктів</p>
          <button className={styles.button} /* onClick={onOpenAddService} */ >Додати першу послугу</button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <SettingsHeader  
        // onOpenAddService={onOpenAddService} 
      />
    </div>
  )
  
}

export default SettingsPage