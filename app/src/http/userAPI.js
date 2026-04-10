import { $host, $authHost } from './index'
import { jwtDecode } from 'jwt-decode'
import { httpPoint } from '../utils/const'

export const check = async () => {
    if (localStorage.getItem('token')) {
        const { data } = await $authHost.get(httpPoint.user + 'auth')
        localStorage.setItem('token', data.token)
        return {
            user: jwtDecode(data.token),
        }
    }
}

export const registration = async (login, password, email, timezone) => {
    const { data } = await $host.post(httpPoint.user + 'registration', { login, password, email, timezone })
    return {
            user: jwtDecode(data.token),
            token: data.token
        }
}

export const login = async (login, password) => {
    const { data } = await $host.post(httpPoint.user + 'login', { login, password })
    return {
            user: jwtDecode(data.token),
            token: data.token
        }
}