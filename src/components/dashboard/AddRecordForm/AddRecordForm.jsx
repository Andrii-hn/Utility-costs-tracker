import { useEffect, useState } from "react"

import styles from "./AddRecordForm.module.css"

function AddRecordForm({ initialData, name, hasMeter, onSubmit, onCancel }) {
  const [ formData, setFormData ] = useState({
    startValue : "",
    endValue : "",
    amount : "",
    date : "" 
  })

  function handleSubmit() {
    onSubmit(formData)
    onCancel()
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({
        ...prev,
        [name] : value
    }))
  }

  useEffect(() => {
    if (initialData == null) {
      setFormData({
        startValue : "",
        endValue : "",
        amount : "",
        date : "" 
      })
      return
    }
    setFormData({
      startValue : initialData.startValue ?? "",
      endValue : initialData.endValue ?? "",
      amount : String(initialData.amount ?? ""),
      date : initialData.date ?? ""
    })
  }, [initialData])

  return (
    <div className={styles.form}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          Нові показники: {name}
        </h2>
      </header>

      <div className={styles.grid}>

        {hasMeter && (
          <>
            <div className={styles.field}>
              <label className={styles.label}>Початковий показник</label>
              <input 
                type="number" 
                name="startValue" 
                value={formData.startValue}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Кінцевий показник</label>
              <input 
                type="number"
                name="endValue" 
                value={formData.endValue}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </>
        )}

        <>
          <div className={styles.field}>
            <label className={styles.label}>Сума</label>
            <input 
              type="number"
              name="amount" 
              value={formData.amount}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Дата</label>
            <input 
              type="date"
              name="date" 
              value={formData.date}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </>
      </div>

      <footer className={styles.actions}>
        <button 
          type="button" 
          className={styles.primaryButton}
          onClick={handleSubmit}
          >
            Зберегти
          </button>
        <button 
          type="button" 
          className={styles.secondaryButton}
          onClick={onCancel}
          >
            Скасувати
          </button>
      </footer>
    </div>
  )
}

export default AddRecordForm