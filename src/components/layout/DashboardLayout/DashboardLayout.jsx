import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import Sidebar from "./DashboardSidebar/Sidebar"
import Header from "./DashboardHeader/Header"
import AddPropertyForm from "../../dashboard/AddPropertyForm/AddPropertyForm"

import styles from "./DashboardLayout.module.css"
import Modal from "./Modal/Modal"

function DashboardLayout({ onLogout, user, onUpdateUser, onChangePassword, properties, setProperties }) {
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false)
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false)

  function openSidebar() {
    setIsSidebarOpen(true)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function toggleSidebar() {
    setIsSidebarOpen(prev => !prev)
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

    let serviceRecords = {};
    services.forEach(service => {
      serviceRecords[service.id] = [];
    })

    let newProperty = {
      id,
      ...formData,
      createdAt,
      serviceRecords
    }
    setProperties(prev => [...prev, newProperty])
    setIsAddPropertyModalOpen(false)
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
    setIsAddPropertyModalOpen(false)
  }

  function onDeleteService(id) {
    setServices(prev => prev.filter((service) => service.id != id));
  }

  function onUpdateService(updatedService) {
    setServices(prevServices => 
      prevServices.map(service =>
        service.id === updatedService.id
          ? { ...service, ...updatedService }
          : service
      )
    );
  }

  function onAddRecord( propertyId, serviceId, record ) {
    setProperties(prevProperties => 
      prevProperties.map(property => {
        if (property.id !== propertyId) {
          return property;
        }
        return {
          ...property, 
          serviceRecords: {
            ...property.serviceRecords, 
            [serviceId]: [
              ...(property.serviceRecords?.[serviceId] || []),
              record
            ]
          }
        };
      })
    );
  }

  function onUpdateRecord(propertyId, serviceId, updatedRecord) {
    setProperties(prev => 
      prev.map(property => {
        if (property.id !== propertyId) 
          return property
        return {
          ...property, 
          serviceRecords: {
            ...property.serviceRecords,
            [serviceId]: property.serviceRecords[serviceId].map(record => 
              record.id === updatedRecord.id ? updatedRecord : record
            )
          }
        }
      })
    )
  }

  function onDeleteRecord(propertyId, serviceId, recordId) {
    setProperties(prev => 
      prev.map(property => {
        if (property.id !== propertyId) {
          return property
        }
        return {
          ...property,
          serviceRecords: {
            ...property.serviceRecords,
            [serviceId]: property.serviceRecords[serviceId].filter(
              record => record.id !== recordId
            )
          }
        }
      }) 
    )
  }

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  },[isSidebarOpen])


  return (
    <div className={styles.layout}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
        <Sidebar 
          user={user} 
          properties={properties} 
          onOpenAddProperty={onOpenAddProperty} 
          onCreateProperty={onCreateProperty}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
      </aside>
      {isSidebarOpen && (
        <div className={styles.backdrop} onClick={() => closeSidebar()} />
      )}
      <div className={styles.main}>
        <div className={styles.header}>
            <Header 
              onLogout={onLogout} 
              user={user}
              onToggleSidebar={toggleSidebar}  
            />
        </div>
        <main className={styles.content}>
          <div className={styles.container}>
            <Outlet context={{
              properties,
              onOpenAddProperty,
              services,
              onCreateService,
              onDeleteService,
              onUpdateService,
              onAddRecord,
              onUpdateRecord,
              onDeleteRecord,
              user,
              onUpdateUser,
              onChangePassword
            }}/>
          </div>
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