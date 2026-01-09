function DashboardPage(props) {
    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome!</p>
            <button onClick={props.onLogout}>Logout</button>
        </>
    )
}

export default DashboardPage 