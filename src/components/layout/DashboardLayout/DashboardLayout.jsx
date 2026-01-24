import { useState } from "react"
import { Outlet } from "react-router-dom"

import Sidebar from "./DashboardSidebar/Sidebar"
import Header from "./DashboardHeader/Header"
import AddPropertyForm from "../../dashboard/AddPropertyForm/AddPropertyForm"

import styles from "./DashboardLayout.module.css"
import Modal from "./Modal/Modal"

function DashboardLayout({ onLogout, user, properties, setProperties }) {
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false)

  function onSelectProperty(propertyId) {
    setSelectedPropertyId(propertyId)
  }

  function onOpenAddProperty() {
    setIsAddPropertyModalOpen(true)
  }

  function onCreateProperty(formData) {
    let newId;
    if (properties.length === 0) {
      newId = 1;
    } else {
      let lastProperty = properties[properties.length - 1]
      newId = lastProperty.id + 1;
    }

    let id = newId;
    let createdAt = new Date().toISOString();  

    let newProperty = {
      id,
      ...formData,
      createdAt,
      costs: []
    }
    setProperties(prev => [...prev, newProperty])
    setIsAddPropertyModalOpen(false)
    setSelectedPropertyId(newId)
  }

  // { SettingsPage }
  const services = []

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Sidebar 
          user={user} 
          properties={properties} 
          selectedPropertyId={selectedPropertyId} 
          onSelectProperty={onSelectProperty} 
          onOpenAddProperty={onOpenAddProperty} 
          onCreateProperty={onCreateProperty}
        />
      </aside>
      <div className={styles.main}>
        <div className={styles.header}>
            <Header onLogout={onLogout} user={user}/>
        </div>
        <main className={styles.content}>
            <Outlet context={{
              properties,
              selectedPropertyId,
              onOpenAddProperty,
              services
            }}/>
        </main>

        {isAddPropertyModalOpen && (
          <Modal onClose={() => setIsAddPropertyModalOpen(false)}>
            <AddPropertyForm 
              onSubmit={onCreateProperty}
              onCancel={() => setIsAddPropertyModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  )
}

export default DashboardLayout