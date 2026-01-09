function LoginPage(props) {
    return (
        <>
            <h1>Login</h1>
            <p>This is login page</p>
            <button onClick={props.onLogin}>Login</button>
        </>
    )
}

export default LoginPage