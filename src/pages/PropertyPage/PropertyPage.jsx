import { useState } from "react";
import { useParams, useOutletContext, useNavigate, Link } from "react-router-dom"

import { calculateServiceSummary } from "../../utils/calcucateServiceSummary";
import { getTotalAmount } from "../../utils/getTotalAmount";

import PropertyDetails from "../../components/dashboard/PropertyDetails/PropertyDetails"
import Modal from "../../components/layout/DashboardLayout/Modal/Modal";
import AddRecordForm from "../../components/dashboard/AddRecordForm/AddRecordForm";
import RecordsTable from "../../components/dashboard/RecordsTable/RecordsTable";
import ServiceSummary from "../../components/dashboard/ServiceSummary/ServiceSummary";
import ExpensesLineChart from "../../components/dashboard/ExpensesChart/LineChart/ExpensesLineChart";
import ExpensesBarChart from "../../components/dashboard/ExpensesChart/BarChart/BarChart";
import ExpensesAreaChart from "../../components/dashboard/ExpensesChart/AreaChart/AreaChart";
import { prepareExpensesChartData } from "../../utils/charts";

import styles from "./PropertyPage.module.css"
import { prepareExpensesByServiceData } from "../../utils/expensesByService";
import ExpensesByServiceChart from "../../components/dashboard/ExpensesByServiceChart/ExpensesByServiceChart";

function PropertyPage() {
  const propId = useParams().id;
  const { properties, services, onAddRecord, onUpdateRecord, onDeleteRecord } = useOutletContext();
  const navigate = useNavigate();
  const [ activeServiceId, setActiveServiceId ] = useState(
    services.length > 0 ? services[0].id : null
  )  
  const [ isAddRecordModalOpen, setIsAddRecordModalOpen ] = useState(false) 

  const [ editingRecord, setEditingRecord ] = useState(null)

  const [ selectedChart, setSelectedChart ] = useState("line")

  const property = properties.find((p) => p.id === Number(propId));
  
  if (!property) {
      return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>
          Об'єкт не знайдено!
        </h1>
        <p className={styles.notFoundText}>
          Можливо, цей об'єкт було видалено або посилання застаріле.
        </p>
        <button
          className={styles.notFoundButton} 
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

  const summary = activeService
    ? calculateServiceSummary(records, activeService.hasMeter)
    : null;

  function handleCreateRecord(formData) {
    const id = records.length === 0 ? 1 : records[records.length - 1].id + 1;
    
    const record = {
      id,
      startValue: formData.startValue === "" ? null : Number(formData.startValue),
      endValue: formData.endValue === "" ? null : Number(formData.endValue),
      amount: Number(formData.amount),
      date: formData.date,
      createdAt: new Date().toISOString(),
    }
    onAddRecord( property.id, activeServiceId, record )
    handleCloseModal()
  }

  function handleUpdateRecord(formData) {
    const updatedRecord = {
      ...editingRecord,
      startValue: formData.startValue === "" ? null : Number(formData.startValue),
      endValue: formData.endValue === "" ? null : Number(formData.endValue),
      amount: Number(formData.amount),
      date: formData.date,
      updatedAt: new Date().toISOString(),
    }
    onUpdateRecord(property.id, activeServiceId, updatedRecord)
  }

  function handleSubmitRecord(formData) {
    if (editingRecord) {
      handleUpdateRecord(formData)
    } else {
      handleCreateRecord(formData)
    }
  }

  function handleDeleteRecord(record) {
    onDeleteRecord(property.id, activeServiceId, record.id)
  }

  function handleEditRecord(record) {
    setEditingRecord(record);
    setIsAddRecordModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddRecordModalOpen(false)
    setEditingRecord(null)
  }

  function getInitialFormData() {
    if (editingRecord !== null) {
      return editingRecord
    } else if (records.length === 0) {
      return null
    } else {
      const lastRecord = records[records.length - 1];
      return {
        startValue: lastRecord.endValue
      }
    }
  }

  const initialFormData = getInitialFormData();

  const totalAmountForProperty = getTotalAmount(serviceRecords)
  
  const chartData = prepareExpensesChartData(records);

  const { data, total } = prepareExpensesByServiceData({serviceRecords, services});

  const charts = {
    line: <ExpensesLineChart data={chartData} />,
    bar: <ExpensesBarChart data={chartData} />,
    area: <ExpensesAreaChart data={chartData} />
  }

  return (
    <div className={styles.page}>
      <section className={styles.propertySection}>
        <PropertyDetails 
          property={property} 
          totalAmountForProperty={totalAmountForProperty}
        />
        <ExpensesByServiceChart data={data} total={total} />
      </section>

      <section className={styles.tabsSection}>
        <div className={styles.tabs}>
          {services.length === 0 ? (
            <div className={styles.empty}>
              <span>Спочатку створіть комунальні послуги в&nbsp;</span>
              <Link to="/dashboard/service-settings" className={styles.settingsLink}>
                налаштуваннях
              </Link>
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


      {services.length !== 0 && (
        <section className={styles.recordsSection}>
          <div className={styles.recordsHeader}>
            <h2 className={styles.recordsTitle}>
              Історія показників
            </h2>
            <button
              className={styles.addRecordButton} 
              onClick={() => {
              setEditingRecord(null)
              setIsAddRecordModalOpen(true)
              }}
            >
              Додати показники
            </button>
          </div>

          <div className={styles.recordsContent}>
            <RecordsTable 
              records={records} 
              hasMeter={activeService?.hasMeter} 
              onEdit={handleEditRecord}
              onDelete={handleDeleteRecord}
            />
          </div>
        </section>
      )}
      
      <ServiceSummary summary={summary} />

      <section className={styles.chartsSection}>
        <div className={styles.chartsHeader}>
          <h3 className={styles.chartsTitle}>Динаміка витрат</h3>
          <div className={styles.selectWrapper}>
            <select 
              className={styles.select}
              value={selectedChart} 
              onChange={(event) => setSelectedChart(event.target.value)}
            >
              <option value="line">Лінійний</option>
              <option value="bar">Стовпчастий</option>
              <option value="area">З заливкою</option>
            </select>
          </div>
        </div>
        {charts[selectedChart]}
      </section>

      {isAddRecordModalOpen && (
          <Modal onClose={() => handleCloseModal()}>
            {(editingRecord !== undefined) && (
              <AddRecordForm 
                name={activeService.name}
                hasMeter={activeService.hasMeter}
                initialData={initialFormData}
                onSubmit={handleSubmitRecord}
                onCancel={handleCloseModal}
              />              
            )}
          </Modal>
        )
      }
    </div>
  )
}

export default PropertyPage