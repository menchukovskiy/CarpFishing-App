const ErrorFallback = ({ error, onReset }) => {
    return (
        <div style={{ padding: 40, textAlign: 'center' }}>
            <h2>Что-то пошло не так 😢</h2>
            <p>
                Произошла ошибка интерфейса.
                Мы уже работаем над этим.
            </p>


            <button onClick={onReset}>
                Попробовать снова
            </button>
        </div>
    )
}

export default ErrorFallback