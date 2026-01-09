function CallToAction({onLoginClick, onDemoClick}) {
    return (
        <>
            <div>
                <button onClick={onLoginClick}>Увійти</button>
                <button onClick={onDemoClick}>Спробувати демо</button>
            </div>
        </>
    )
}

export default CallToAction