import benefitsData from "../../../data/benefits"
import styles from "./Benefits.module.css"

function Benefits() {
  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <h2 className={styles.title}>{benefitsData.title}</h2>
        <div className={styles.grid}>
          {benefitsData.items.map((item) => (
            <div className={styles.card} key={item.title}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits