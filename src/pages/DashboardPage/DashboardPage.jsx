import { useEffect, useState } from "react"

import AddPropertyForm from "../../components/dashboard/AddPropertyForm/AddPropertyForm";
import propertiesJson from "../../data/dashboard/properties.json"
import PageHeader from "../../components/dashboard/PageHeader/PageHeader";

import styles from "./DashboardPage.module.css"
import PropertiesList from "../../components/dashboard/PropertiesList/PropertiesList";

function DashboardPage(props) {
  function getInitialProperties() {
    const items = JSON.parse(localStorage.getItem('properties'));
    if (items) {
      return items
    } else {
      return propertiesJson
    }
  }

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
      createdAt
    }
    setProperties(prev => [...prev, newProperty])
    setIsModalOpen(false)
  }

  const [properties, setProperties] = useState(() => getInitialProperties() );
    useEffect(() => {
      localStorage.setItem('properties', JSON.stringify(properties))
    }, [properties])
   
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

      {/* <h2>Список об'єктів:</h2>
      <div className="divchik">
        {properties.map((property) => (
          <div key={property.id}>
            <p>Назва об'єкту: {property.name}</p>
            <p>Місто: {property.city}</p>
            <p>Адреса: {property.address}</p>
          </div>
        ))}
      </div> */}

      <PropertiesList properties={properties}/>
    </>
  )
}

export default DashboardPage 