import React from 'react'
import ErrorFallback from './ErrorFallback'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            error: null
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error, errorInfo) {
        console.error('UI Crash:', error, errorInfo)

        // сюда можно отправить лог на сервер / Sentry
    }

    resetError = () => {
        this.setState({
            hasError: false,
            error: null
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorFallback
                    error={this.state.error}
                    onReset={this.resetError}
                />
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary