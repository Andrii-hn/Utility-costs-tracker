import { useState } from "react"

import styles from "./AddRecordForm.module.css"

function AddRecordForm({ hasMeter, onSubmit, onCancel }) {
  const [ formData, setFormData ] = useState({
    startValue: "",
    endValue: "",
    amount: "",
    date: ""
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

  return (
    <div className={styles.header}>
      <header>
        <h2 className={styles.title}>
          Нові показники
        </h2>
      </header>

      <div className={styles.fields}>

        {hasMeter && (
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Початковий показник</label>
              <input 
                type="number" 
                name="startValue" 
                value={formData.startValue}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

111111111111111111111111111111111111111111111111111111111111111

      </div>
      {hasMeter === true ? (
        <form>
          <div>
            <label>Початковий показник</label>
            <input 
              type="number" 
              name="startValue" 
              value={formData.startValue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Кінцевий показник</label>
            <input 
              type="number"
              name="endValue" 
              value={formData.endValue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Сума</label>
            <input 
              type="number"
              name="amount" 
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Дата</label>
            <input 
              type="date"
              name="date" 
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </form>
      ) : (
        <form>
          <div>
            <label>Сума</label>
            <input 
              type="number"
              name="amount" 
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Дата</label>
            <input 
              type="date"
              name="date" 
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </form>) 
      }
      <div>
        <button type="button" onClick={() => handleSubmit()}>Зберегти</button>
        <button type="button" onClick={() => onCancel()}>Скасувати</button>
      </div>
    </div>
  )
}

export default AddRecordForm