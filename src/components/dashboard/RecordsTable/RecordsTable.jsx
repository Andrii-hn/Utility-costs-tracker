import styles from "./RecordsTable.module.css"

function RecordsTable({ hasMeter, records }) {
  return (
    <div className={styles.wrapper}>
      {records.length === 0 ? (
        <div className={styles.empty}>
          Ще немає показників для цієї послуги
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              {hasMeter && <th>Початковий</th>}
              {hasMeter && <th>Кінцевий</th>}
              <th>Сума</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                {hasMeter && <td>{record.startValue}</td>}
                {hasMeter && <td>{record.endValue}</td>}
                <td>{record.amount}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RecordsTable