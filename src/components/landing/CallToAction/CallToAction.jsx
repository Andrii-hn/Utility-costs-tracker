import styles from "./CallToAction.module.css"

function CallToAction({onLoginClick, onDemoClick}) {
  return (
    <section className={styles.сallToAction}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Почніть керувати комунальними витратами вже сьогодні
        </h2>
        <p className={styles.subtitle}>Безкоштовно. Без реєстраціїю Дані зберігаються локально.</p>
        <div className={styles.buttons}>
          <button 
            className={styles.primaryButton}
            onClick={onLoginClick}
          >Увійти</button>
          <button 
            className={styles.secondaryButton}
            onClick={onDemoClick}
          >Спробувати демо</button>
        </div>
      </div>
    </section>
  )
}

export default CallToAction