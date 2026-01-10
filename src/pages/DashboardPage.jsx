import json from "../data/dashboard/properties.json"
import { useState } from "react"

function DashboardPage(props) {
    const [properties, setProperties] = useState(json)
    console.log(properties)
    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome!</p>
            <button onClick={props.onLogout}>Logout</button>
        </>
    )
}

export default DashboardPage 