import { $authHost } from './index'
import { httpPoint } from '../utils/const'

export const getUserInfo = async () => {
    const { data } = await $authHost.get(`${httpPoint.settings}user-info`)
    return data
}

export const updateUserInfo = async (payload) => {
    const { data } = await $authHost.put(`${httpPoint.settings}user-info`, payload)
    return data
}

export const getUserSecurities = async () => {
    const { data } = await $authHost.get(`${httpPoint.settings}user-securities`)
    return data
}   

export const updateUserSecurities = async (payload) => {
    const { data } = await $authHost.put(`${httpPoint.settings}user-securities`, payload)
    return data
}