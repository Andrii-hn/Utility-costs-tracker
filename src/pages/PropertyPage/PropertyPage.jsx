import { useParams, useOutletContext, useNavigate } from "react-router-dom"

import PropertyDetails from "../../components/dashboard/PropertyDetails/PropertyDetails"

function PropertyPage() {
  const { properties } = useOutletContext();
  const navigate = useNavigate();
  const propId = useParams().id;

  const property = properties.find((p) => p.id === Number(propId));

  if (!property) {
    return (
      <div>
        <h1>Об'єкт не знайдено!</h1>
        <button 
          onClick={() => navigate(`/dashboard`)}    
        >
          Повернутися до списку
        </button>
      </div>
    )
  }


  return (
    <div>
      <PropertyDetails property={property} />
    </div>
  )
}

export default PropertyPage