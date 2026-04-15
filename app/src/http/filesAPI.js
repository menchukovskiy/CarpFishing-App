import { $authHost } from './index'
import { httpPoint } from '../utils/const'

export const getFiles = async ( catalog, file ) => {
    
        const { data } = await $authHost.get(`${httpPoint.files}/${catalog}/${file}`, {
            responseType: 'blob'
        })
        return data
    
}