import { useState } from "react"

import styles from "./AddPropertyForm.module.css"

function AddPropertyForm({ onSubmit, onCancel }) {
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")

  const isSubmitDisabled = !name.trim() || !city.trim() || !address.trim()

  function resetForm() {
    setName("")
    setCity("")
    setAddress("")
  }
  return <>
    
    <form
      className={styles.root} 
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({ name, city, address })
        resetForm()
        }}>
      <h2 className={styles.title}>Додайте новий об'єкт</h2>

      <div className={styles.field}>
        <label className={styles.label}>Назва: </label>
        <input 
          className={styles.input}
          type="text" 
          value={name} 
          onChange={(event) => setName(event.target.value)} />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Місто: </label>
        <input 
          className={styles.input}
          type="text" 
          value={city} 
          onChange={(event) => setCity(event.target.value)} />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Адреса: </label>
        <input
          className={styles.input} 
          type="text" 
          value={address} 
          onChange={(event) => setAddress(event.target.value)} />
      </div>

      <div className={styles.actions}>
        <button 
          type="button" 
          className={styles.cancel}  
          onClick={() => {
            resetForm(); 
            onCancel();
          }}
        >
            Скасувати
        </button>
        <button 
          type="submit" 
          className={styles.submit}
          disabled={isSubmitDisabled}
        >
          Зберегти
        </button>
      </div>
    </form>
  </>
}

export default AddPropertyForm