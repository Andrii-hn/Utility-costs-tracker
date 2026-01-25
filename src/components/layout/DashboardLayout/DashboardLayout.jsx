import { useState, useEffect } from "react"
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
      createdAt
    }
    setProperties(prev => [...prev, newProperty])
    setIsAddPropertyModalOpen(false)
    setSelectedPropertyId(newId)
  }

  // { SettingsPage }
  const [ services, setServices ] = useState(() => {
    const stored = localStorage.getItem("services");
    return stored ? JSON.parse(stored) : []
  });

  useEffect (() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  function onCreateService(formServiceData) {
    let newId;
    if (services.length === 0) {
      newId = 1;
    } else {
      let lastService = services[services.length - 1];
      newId = lastService.id + 1;
    }
    let id = newId;
    let createdAt = new Date().toISOString();

    let newService = {
      id, 
      ...formServiceData,
      createdAt
    }

    setServices(prev => [...prev, newService])
  }

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
              services,
              onCreateService
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