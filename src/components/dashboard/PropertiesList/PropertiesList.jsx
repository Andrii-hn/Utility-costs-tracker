import { useState } from "react";
import PropertyItem from "../PropertyItem/PropertyItem";

import styles from "./PropertiesList.module.css"

function PropertiesList({ properties, onOpen }) {
  const [expandedPropertyId, setExpandedPropertyId] = useState(null)
  
  function handleToggle(id) {
    setExpandedPropertyId(prev =>
        prev === id ? null : id
    );
  }

  return (
    <>
      <div className={styles.list}>
        {properties.map((property) => (
            <PropertyItem 
                key={property.id}
                property={property}
                isExpanded={expandedPropertyId === property.id}
                onToggle={() => handleToggle(property.id)}
                onOpen={onOpen ? () => onOpen(property.id) : undefined}
            />
        ))}  
      </div>        
    </>
  )
}

export default PropertiesList