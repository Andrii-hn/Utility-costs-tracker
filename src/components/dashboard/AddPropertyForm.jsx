import { useState } from "react"

function AddPropertyForm({ onSubmit, onCancel }) {
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")

    const isSubmitDisabled = !name.trim() || !city.trim() || !address.trim()

    function resetForm() {
        setName("")
        setCity("")
        setAddress("")
    }

    return <>
        <h1>Додайте новий об'єкт</h1>
        <form onSubmit={(event) => {
            event.preventDefault()
            onSubmit({ name, city, address })
            resetForm()
            }}>

            <label htmlFor="">Назва: </label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} /> <br />
            <label htmlFor="">Місто: </label>
            <input type="text" value={city} onChange={(event) => setCity(event.target.value)} /> <br />
            <label htmlFor="">Адреса: </label>
            <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} /> <br />

            <button type="submit" disabled={isSubmitDisabled}>Зберегти</button>
            <button type="button" onClick={() => {
                resetForm() 
                onCancel()
                }}>Скасувати</button>
        </form>
    </>
}

export default AddPropertyForm