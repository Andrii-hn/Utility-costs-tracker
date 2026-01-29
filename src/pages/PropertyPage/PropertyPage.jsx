import { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom"

import PropertyDetails from "../../components/dashboard/PropertyDetails/PropertyDetails"
import Modal from "../../components/layout/DashboardLayout/Modal/Modal";

import styles from "./PropertyPage.module.css"

function PropertyPage() {
  const propId = useParams().id;
  const { properties, services } = useOutletContext();
  const navigate = useNavigate();
  const [ activeServiceId, setActiveServiceId ] = useState(
    services.length > 0 ? services[0].id : null
  )  
  const [ isAddRecordModalOpen, setIsAddRecordModalOpen ] = useState(false) 
  const property = properties.find((p) => p.id === Number(propId));
  
  if (!property) {
      return (
          <div>
        <h1>Об'єкт не знайдено!</h1>
        <button 
          onClick={() => navigate(`/dashboard`)}    
          >
          Повернутися до списку
        </button>
      </div>
    )
  }
  
  const serviceRecords = property.serviceRecords || {}
//   const records = serviceRecords[activeServiceId] || [];   
  const activeService = services.find(service => activeServiceId === service.id)

  const records = [
    { start: 100, end: 120, amount: 300, date: "2024-01-01" }
  ]   

  return (
    <div>
      <PropertyDetails property={property} />
      {services.length === 0 ? (
        <div>
          Спочатку створіть комунальні послуги
        </div>
      ) : (
        services.map((service) => (
          <div 
            key={service.id}
            className={`${styles.tab} ${activeServiceId === service.id ? styles.active : ""}`}
            onClick={() => setActiveServiceId(service.id)}
          >{service.name}</div>  
        ))
      )}

      <button onClick={() => setIsAddRecordModalOpen(true)}>Додати показники</button>

      {isAddRecordModalOpen && (
          <Modal>
            <div>Нові показники: {activeService.name}</div>
            <div>
              <button>Зберегти</button>
              <button onClick={() => setIsAddRecordModalOpen(false)}>Скасувати</button>
            </div>
          </Modal>
        )
      }

      {records.length === 0 ? (
        <div>Ще немає показників для цієї послуги</div>
      ) : (
        activeService?.hasMeter === false ? (
          <table>
            <thead>
              <tr>
                <th>Сума</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Початковий</th>
                <th>Кінцевий</th>
                <th>Сума</th>
                <th>Дата</th>
              </tr>
            </thead>
          </table>
        )
      )}
    </div>
  )
}

export default PropertyPage