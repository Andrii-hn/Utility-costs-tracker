import { useState, useRef } from "react"
import { useOutletContext } from "react-router-dom"

import styles from "./ProfilePage.module.css"

function ProfilePage() {
  const { user, onUpdateUser } = useOutletContext();
  const [ formData, setFormData ] = useState({
    fname: user.fname,
    lname: user.lname,
    email: user.email
  })
  const [ isSaved, setIsSaved ] = useState(false)
  const hideTimerRef = useRef(null)

  function handleChange(event) {
    setIsSaved(false)
    setFormData(prev => ({
        ...prev,
        [event.target.name] : event.target.value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(formData)
    setIsSaved(true)
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
    }

    hideTimerRef.current = setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  }
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Профіль користувача</h1>
      
      <div className={styles.card}> 
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Ім'я</label>
            <input 
              type="text" 
              value={formData.fname}
              name="fname"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Прізвище</label>
            <input 
              type="text" 
              value={formData.lname}
              name="lname"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input 
              type="email" 
              value={formData.email}
              name="email"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.actions}>
            {isSaved && (
              <div className={`${styles.success} ${
                isSaved ? styles.visible : styles.hidden
              }`}
              >
                ✔
                Зміни збережено
              </div>
            )}
            <button 
              type="submit"
              className={styles.saveButton}
            >
              Зберегти зміни
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage