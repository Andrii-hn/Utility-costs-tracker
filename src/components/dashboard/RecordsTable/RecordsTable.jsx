import styles from "./RecordsTable.module.css"

import { formatDate } from "../../../utils/date"

function RecordsTable({ hasMeter, records, onEdit, onDelete }) {
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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                {hasMeter && <td data-label="Початковий">{record.startValue}</td>}
                {hasMeter && <td data-label="Кінцевий">{record.endValue}</td>}
                <td data-label="Сума">
                  <div>
                    {record.amount}
                    <span className={styles.currency}> ₴</span>
                  </div>
                </td>
                <td data-label="Дата">{formatDate(record.date)}</td>
                <td 
                  className={styles.actions}>
                  <div>
                    <button 
                    className={styles.editButton}
                    onClick={() => onEdit(record)}
                    > 
                      Редагувати
                    </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => onDelete(record)}
                    >
                      Видалити
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RecordsTable