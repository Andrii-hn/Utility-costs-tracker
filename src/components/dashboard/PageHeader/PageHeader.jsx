import styles from "./PageHeader.module.css"

function PageHeader({ title, onAddClick }) {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>{title}</h1>
            <button className={styles.action} onClick={onAddClick}>
                Додати об'єкт
            </button>
        </div>
    )
}

export default PageHeader