import ServiceItem from "../ServiceItem/ServiceItem"

import styles from "./ServicesList.module.css"

function ServicesList({ services, onRequestDelete, onRequestEdit }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Доступні послуги</h2>

      <div className={styles.list}>
        {services.map((service) => (
          <ServiceItem 
            key={service.id}
            service={service}
            onRequestDelete={onRequestDelete}
            onRequestEdit={onRequestEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default ServicesList