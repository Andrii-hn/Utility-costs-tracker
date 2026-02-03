import styles from "./ServiceSummary.module.css"

function ServiceSummary({ summary }) {
  if (!summary || summary.fromDate === null) {
    return (
      <div className={styles.empty}>
        Тут з'являться сумарні дані по цій послузі 
      </div>
    )
  }
  console.log(summary);
  return (
    <div className={styles.summary}>
      <p className={styles.period}>
        З {summary.fromDate} по {summary.toDate}
      </p>
      <p className={styles.amount}>
        Сплачено: <strong>{summary.totalAmount}</strong>
      </p>
      {summary.totalUsage !== null && (
        <p className={styles.usage}>
          Нараховано: <strong>{summary.totalUsage}</strong>
        </p>
      )}

      {summary.skippedUsageRecords > 0 && (
        <p className={styles.warning}>
          ⚠️{summary.skippedUsageRecords} запис
          {summary.skippedUsageRecords > 1 ? 'ів' : ''}
          {" "} не враховано в підрахунку показників через некоректні дані
        </p>
      )}
    </div>
  )
}

export default ServiceSummary