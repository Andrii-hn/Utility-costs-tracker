import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import SettingsHeader from "../../components/settings/SettingsHeader/SettingsHeader"
import AddServiceForm from "../../components/settings/AddServiceForm/AddServiceForm"

import styles from "./SettingsPage.module.css"
import Modal from "../../components/layout/DashboardLayout/Modal/Modal"

function SettingsPage() {
  const { services, onCreateService } = useOutletContext()
  const [ isAddServiceModalOpen, setIsAddServiceModalOpen ] = useState(false)

  function onOpenAddService() {
    setIsAddServiceModalOpen(true)
  }

  return (
    <div>
      <SettingsHeader  
        onOpenAddService={onOpenAddService} 
      />

      {services.length === 0 ? (
        <div className={styles.wrapper}>
        <div className={styles.empty}>
          <h2 className={styles.title}>У вас поки немає комунальних послуг</h2>
          <p className={styles.desc}>Створіть послуги, які будуть доступні для всіх обʼєктів</p>
          <button className={styles.button}  onClick={onOpenAddService} >Додати першу послугу</button>
        </div>
      </div>
      ) : (
        <div>List</div>
      )}

      {isAddServiceModalOpen && (
        <Modal onClose={() => setIsAddServiceModalOpen(false)}> 
          <AddServiceForm 
            onSubmit={onCreateService}
            onCancel={() => setIsAddServiceModalOpen(false)} 
            />
        </Modal>
      )}
    </div>
  )
  
}

export default SettingsPage