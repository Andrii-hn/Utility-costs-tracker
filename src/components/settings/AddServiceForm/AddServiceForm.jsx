import { useState } from "react"

import styles from "./AddServiceForm.module.css"

function AddServiceForm({ onSubmit, onCancel }) {
  const [ name, setName ] = useState("")
  const [ hasMeter, setHasMeter ] = useState(true)

  const isSubmitDisabled = !name.trim();

  function resetForm() {
    setName("")
    setHasMeter(true)
  }

  return (
      <form
        className={styles.root}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ name, hasMeter })
          resetForm()
        }}>
        <div className={styles.header}>
          <h1 className={styles.title}>Додати комунальну послугу</h1>
        </div>
        
        <div className={styles.main}>
          <div className={styles.field}>
            <label className={styles.label}>Назва послуги:</label>
            <input 
              type="text"
              className={styles.input}
              value={name}
              onChange={(event) => setName(event.target.value)}
              />
          </div>
          <div className={styles.checkboxRow}>
            <input 
              className={styles.checkbox}
              type="checkbox" 
              checked={hasMeter}
              onChange={(event) => setHasMeter(event.target.checked)}
              />
            <label className={styles.label}>Показники</label>
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
        </div>
      </form>
  )
}

export default AddServiceForm