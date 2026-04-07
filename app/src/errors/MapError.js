import ERROR_MAP from './errorMap.json'
import { LANG } from '../language/lang'

export function MapError(module, code) {
    const mappedError =
        ERROR_MAP[module]?.[code] || ERROR_MAP['UNEXPECTED_ERROR']

    return {
        field: mappedError.field,
        message: LANG(mappedError.text),
        severity: mappedError.severity,
        showInUI: mappedError.showInUI
    }
}