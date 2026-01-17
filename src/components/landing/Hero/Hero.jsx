import styles from "./Hero.module.css"

function Hero () {
  return <>
    <section className={styles.hero}>        
      <div className={styles.container}>
        <h1 className={styles.title}>Bills and Costs</h1>
        <p className={styles.subtitle}>Сервіс для обліку комунальних послуг по об’єктах нерухомості (квартири, будинки)</p>
        <ul className={styles.features}>
          <li>Додавати квартири та будинки</li>
          <li>Зберігати комунальні витрати</li>
          <li>Контролювати історію платежів</li>
        </ul>
      </div>
    </section>
  </>
}

export default Hero