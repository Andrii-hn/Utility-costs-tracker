import { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom"

import PropertyDetails from "../../components/dashboard/PropertyDetails/PropertyDetails"
import Modal from "../../components/layout/DashboardLayout/Modal/Modal";
import AddRecordForm from "../../components/dashboard/AddRecordForm/AddRecordForm";
import RecordsTable from "../../components/dashboard/RecordsTable/RecordsTable";

import styles from "./PropertyPage.module.css"

function PropertyPage() {
  const propId = useParams().id;
  const { properties, services, onAddRecord } = useOutletContext();
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
  const records = serviceRecords[activeServiceId] || [];   
  const activeService = services.find(service => activeServiceId === service.id)

  function handleAddRecord(formData) {
    let id = records.length === 0 ? 1 : records[records.length - 1].id + 1;
    
    const record = {
      id,
      startValue: formData.startValue === "" ? null : Number(formData.startValue),
      endValue: formData.endValue === "" ? null : Number(formData.endValue),
      amount: Number(formData.amount),
      date: formData.date,
      createdAt: new Date().toISOString(),
    }
    onAddRecord( property.id, activeServiceId, record )
    console.log(record)
  }

  return (
    <div className={styles.page}>
      <section className={styles.propertySection}>
        <PropertyDetails property={property} />
      </section>
      
      <section className={styles.tabsSection}>
        <div className={styles.tabs}>
          {services.length === 0 ? (
            <div>
              Спочатку створіть комунальні послуги
            </div>
          ) : (
            services.map((service) => (
              <button 
                key={service.id}
                className={`${styles.tab} ${activeServiceId === service.id ? styles.activeTab : ""}`}
                onClick={() => setActiveServiceId(service.id)}
              >
                {service.name}
              </button>  
            ))
          )}
        </div>
      </section>


      <section className={styles.recordsSection}>
        <div className={styles.recordsHeader}>
          <h2 className={styles.recordsTitle}>
            Історія показників
          </h2>
          <button
            className={styles.addRecordButton} 
            onClick={() => setIsAddRecordModalOpen(true)}
            >
              Додати показники
            </button>
        </div>

        <div className={styles.recordsContent}>
          <RecordsTable 
            records={records} 
            hasMeter={activeService.hasMeter} 
          />
        </div>
      </section>


      {isAddRecordModalOpen && (
          <Modal>
            <div>Нові показники: {activeService.name}</div>
            <AddRecordForm 
              hasMeter={activeService.hasMeter}
              onSubmit={handleAddRecord}
              onCancel={() => setIsAddRecordModalOpen(false)}
            />
          </Modal>
        )
      }
    </div>
  )
}

export default PropertyPage