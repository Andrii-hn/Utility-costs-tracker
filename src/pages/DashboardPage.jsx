import { useEffect, useState } from "react"

import AddPropertyForm from "../components/dashboard/AddPropertyForm";
import propertiesJson from "../data/dashboard/properties.json"

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
    setIsFormVisible(false)
  }

  const [properties, setProperties] = useState(() => getInitialProperties() );
    useEffect(() => {
      localStorage.setItem('properties', JSON.stringify(properties))
    }, [properties])
   
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome!</p>
      <button onClick={props.onLogout}>Logout</button>
      <button onClick={() => setIsFormVisible(true)}>
        Додати об'єкт
      </button>

      {isFormVisible && <AddPropertyForm onSubmit={handleAddProperty} onCancel={() => setIsFormVisible(false)}/>} 

      <h2>Список об'єктів:</h2>
        <div className="divchik">
          {properties.map((property) => (
            <div key={property.id}>
              <p>Назва об'єкту: {property.name}</p>
              <p>Місто: {property.city}</p>
              <p>Адреса: {property.address}</p>
            </div>
          ))}
        </div>
    </>
  )
}

export default DashboardPage 