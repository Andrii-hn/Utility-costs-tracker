import { useState } from "react"

function AddPropertyForm({ onSubmit }) {
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")

    return <>
        <h1>Додайте новий об'єкт</h1>
        <form onSubmit={(event) => {
            event.preventDefault()
            onSubmit({ name, city, address })
            }}>

            <label htmlFor="">Назва: </label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} /> <br />
            <label htmlFor="">Місто: </label>
            <input type="text" value={city} onChange={(event) => setCity(event.target.value)} /> <br />
            <label htmlFor="">Адреса: </label>
            <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} /> <br />

            <button type="submit">Зберегти</button>
            <button type="button">Скасувати</button>
        </form>
    </>
}

export default AddPropertyForm