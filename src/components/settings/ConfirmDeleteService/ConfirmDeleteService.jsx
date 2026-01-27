import styles from "./ConfirmDeleteService.module.css"

function ConfirmDeleteService({ serviceIdToDelete, onCancel, onConfirm }) {
  function confirmForm() {
    onConfirm(serviceIdToDelete)
    onCancel()
  }
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Ви впевнені, що хочете видалити послугу?</h2>
      <p className={styles.text}>Цю дію не можна буде скасувати.</p>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={() => onCancel() }>Скасувати</button>
        <button className={styles.confirm} onClick={() => confirmForm() }>Видалити</button>
      </div>
    </div>
  )
}

export default ConfirmDeleteService