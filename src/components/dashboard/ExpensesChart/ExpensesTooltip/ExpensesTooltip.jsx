import { formatDate } from "../../../../utils/date"

import styles from "./ExpensesTooltip.module.css"

function ExpensesTooltip({ active, label, payload }) {
  if (active === false || !payload?.length) {
    return null
  }
  const amount = payload[0].value;
  return (
    <div className={styles.tooltip}>
      <p className={styles.date}>{formatDate(label)}</p>
      <p className={styles.amount}>Сума: {amount} грн</p>
    </div>
  )
}

export default ExpensesTooltip