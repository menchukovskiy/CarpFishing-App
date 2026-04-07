import axios from "axios"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterseptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterseptor)

const errorHandler = (error) => {
    if (error.response) {

        const data = error.response.data

        return Promise.reject({
            status: error.response.status,
            code: data?.code || 'UNKNOWN_ERROR',
            message: data?.message || 'Server error'
        })
    }

    if (error.request) {
        return Promise.reject({
            status: null,
            message: 'Server is not responding'
        })
    }

    return Promise.reject({
        status: null,
        message: error.message || 'Unexpected error'
    })
}

$host.interceptors.response.use(res => res, errorHandler)
$authHost.interceptors.response.use(res => res, errorHandler)

export {
    $host,
    $authHost
}