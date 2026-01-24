import { useState } from "react";

import styles from "./Auth.module.css"
import { Link } from "react-router-dom";

function RegistrationPage({ onRegister }) {
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Зареєструватися</h1>

        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.form} onSubmit={(event) => {
          event.preventDefault()
          setError("");

          if (!email.trim() || !password.trim()) {
            const errorMessage = "Поля порожні!";
            setError(errorMessage);
            return
          } else if (!email.includes("@")) {
            const errorMessage = "Email неправильного формату!"
            setError(errorMessage);
            return
          } else if (password.length < 6) {
            const errorMessage = "Пароль короткий!"
            setError(errorMessage);
            return
          } else {
            onRegister(fname, lname, email, password)
          }
          
          }
        }>
          <label>Ім'я</label>
          <input type="text" value={fname} onChange={(event) => setFName(event.target.value)}/>
          <label>Прізвище</label>
          <input type="text" value={lname} onChange={(event) => setLName(event.target.value)}/>
          <label>Email: </label>
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} /> 
          <label>Password: </label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /> 
          <button type="submit">Зареєструватися</button>
        </form>

        <Link to="/login" className={styles.toggle}>Маєте аккаунт? Увійти</Link>
      </div>
    </div>
  )
}

export default RegistrationPage