import { useState } from "react"
import { useOutletContext } from "react-router-dom";

import AddPropertyForm from "../../components/dashboard/AddPropertyForm/AddPropertyForm";
import PageHeader from "../../components/dashboard/PageHeader/PageHeader";

import styles from "./DashboardPage.module.css"
import PropertiesList from "../../components/dashboard/PropertiesList/PropertiesList";

function DashboardPage() {
  const { properties, setProperties } = useOutletContext(); 

  function handleAddProperty(formData) {
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
    setIsModalOpen(false)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  }

  return (
    <>
      <PageHeader title="Об'єкти нерухомості" onAddClick={() => setIsModalOpen(true)}/>

      {isModalOpen && 
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.modal}>
            <AddPropertyForm 
              onSubmit={handleAddProperty} 
              onCancel={() => setIsModalOpen(false)}/>
          </div>
        </div>
      } 

      <PropertiesList properties={properties}/>
    </>
  )
}

export default DashboardPage 