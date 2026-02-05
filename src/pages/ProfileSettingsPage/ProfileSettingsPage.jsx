import { useState, useRef } from "react"
import { useOutletContext } from "react-router-dom"

import styles from "./ProfileSettingsPage.module.css"

function ProfileSettingsPage() {
  const { user, onChangePassword } = useOutletContext();
  const [ formData, setFormData ] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [ isChange, setIsChange ] = useState(false)
  const [ formTouched, setIsFormTouched ] = useState(false)
  const [ businessError, setBusinessError ] = useState("")
  const hideTimerRef = useRef(null)

  function handleChange(event) {
    setIsChange(false)
    setIsFormTouched(true);
    setBusinessError("");
    setFormData(prev => ({
      ...prev,
      [event.target.name] : event.target.value
    }))}

  function handleSubmit(event) {
    event.preventDefault();

    const validation = validatePassword(formData);
    if (!validation.isValid) {
      return;
    }

    const result = onChangePassword(formData)
    if (!result.success) {
      setBusinessError(result.error)
      setIsChange(false)
      setIsFormTouched(true);
      return;
    }

    setBusinessError("");
    setIsChange(true);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
    }

    hideTimerRef.current = setTimeout(() => {
      setIsChange(false);
    }, 2000);
    resetForm()

    setIsFormTouched(false)
  }

  function validatePassword(data) {
    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
      return {
        isValid: false,
        error: "Заповніть всі поля"
      };
    }

    if (data.confirmPassword !== data.newPassword) {
      return {
        isValid: false,
        error: "Новий пароль і підтвердження не співпадають"
      };
    }

    if (data.newPassword === data.currentPassword) {
      return {
        isValid: false,
        error: "Новий пароль має відрізнятися від старого"
      };
    }

    return {
      isValid: true,
      error: null
    };
  }

  const validation = validatePassword(formData)

  function resetForm() {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }
  
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Налаштування</h1>

      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.sectionTitle}>Зміна пароля</h2>
          <div className={styles.field}>
            <label className={styles.label}>Старий пароль</label>
            <input 
              type="password"
              className={styles.input}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Новий пароль</label>
            <input 
              type="password"
              className={styles.input}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Підтвердження пароля</label>
            <input 
              type="password"
              className={styles.input}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              />
          </div>
          <div className={styles.actions}>
            <div className={styles.feedback}>
              {businessError && (
                <div>{businessError}</div>
              )}
              {formTouched &&  !validation.isValid && (
                <div className={styles.error}>
                  Помилка: {validation.error}    
                </div>
              )}
              {isChange && (
                <div className={styles.success}>
                  ✔
                  Пароль змінено
                </div>
              )}
            </div>
            <button
              type="submit"
              className={styles.button}
              disabled={!validation.isValid}
            >
              Змінити пароль
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileSettingsPage