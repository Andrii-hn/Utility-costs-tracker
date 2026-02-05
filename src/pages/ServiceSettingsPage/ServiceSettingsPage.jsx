import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import SettingsHeader from "../../components/settings/SettingsHeader/SettingsHeader"
import AddServiceForm from "../../components/settings/AddServiceForm/AddServiceForm"
import ServicesList from "../../components/settings/ServicesList/ServicesList"
import Modal from "../../components/layout/DashboardLayout/Modal/Modal"
import ConfirmDeleteService from "../../components/settings/ConfirmDeleteService/ConfirmDeleteService"

import styles from "./ServiceSettingsPage.module.css"

function SettingsPage() {
  const { services, onCreateService, onDeleteService, onUpdateService } = useOutletContext()
  const [ isAddServiceModalOpen, setIsAddServiceModalOpen ] = useState(false)

  const [ editingService, setEditingService ] = useState(null)

  const [ serviceIdToDelete, setServiceIdToDelete ] = useState(null)
  const [ isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  function onOpenAddService() {
    setIsAddServiceModalOpen(true)
  }

  function handleCreateService(formData) {
    onCreateService(formData)
    setIsAddServiceModalOpen(false)
  }

  function onRequestDelete(id) {
    setServiceIdToDelete(id)
    setIsDeleteModalOpen(true)
  }

  function onRequestEdit(service) {
    setEditingService(service)
  }

  function handleEditService(formData) {
    const updatedService = {
      ...editingService,
      ...formData
    };

    onUpdateService(updatedService);
    setEditingService(null);
  }

  return (
    <div className={styles.page}>
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
        <ServicesList 
          services={services} 
          onRequestDelete={onRequestDelete} 
          onRequestEdit={onRequestEdit}
          />
      )}

      {isAddServiceModalOpen && (
        <Modal onClose={() => setIsAddServiceModalOpen(false)}> 
          <AddServiceForm 
            onSubmit={handleCreateService}
            onCancel={() => setIsAddServiceModalOpen(false)} 
            />
        </Modal>
      )}

      {editingService && (
        <Modal onClose={() => setEditingService(null)}>
          <AddServiceForm
            initialData={editingService}
            onSubmit={handleEditService}
            onCancel={() => setEditingService(null)}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <ConfirmDeleteService 
            serviceIdToDelete={serviceIdToDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={(id) => onDeleteService(id)}
            />
        </Modal>
      )}
    </div>
  )
  
}

export default SettingsPage