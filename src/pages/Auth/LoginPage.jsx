import { useState } from "react";

import styles from "./Auth.module.css"
import { Link } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Увійти</h1>

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
            onLogin(email, password)
          }
          
          }
        }>
          <label>Email: </label>
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} /> <br />
          <label>Password: </label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /> <br />
          <button type="submit">Увійти</button>
        </form>

        <Link to="/register" className={styles.toggle}>Немає аккаунту? Зареєструватися</Link>
      </div>
    </div>
  )
}

export default LoginPage