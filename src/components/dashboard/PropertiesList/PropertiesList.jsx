import { useState } from "react";
import PropertyItem from "../PropertyItem/PropertyItem";

import styles from "./PropertiesList.module.css"

function PropertiesList({ properties }) {
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
            />
        ))}  
      </div>        
    </>
  )
}

export default PropertiesList


// <div>
//         {properties.map((property) => (
//           <div key={property.id} onClick={
//             () => handleToggle(property.id)}>
//             <p>{property.name}</p>
//             <p>{property.city}</p>
//             <p>{property.address}</p>
//           </div>
//         ))}
//       </div>