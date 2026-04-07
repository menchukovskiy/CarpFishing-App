import { MapError } from '../errors/MapError'

export const createThunkErrorHandler = (scope) => {
    return (state, action) => {

        state.isLoading = false

        const errorCode =
            action.payload ??
            action.error?.message ??
            'UNEXPECTED_ERROR'

        const mapped = MapError(scope, errorCode)

        const localFields = mapped.field.filter(f => f !== 'global')
        const globalFields = mapped.field.filter(f => f === 'global')

        state.errors = localFields.reduce((acc, field) => {
            acc[field] = {
                message: mapped.message,
                severity: mapped.severity,
                
            }
            return acc
        }, {})

        if (globalFields.length) {
            state.globalError = {
                message: mapped.message,
                severity: mapped.severity,
                errorCode
            }
        }
    }
}