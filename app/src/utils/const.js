import { colors } from "../theme";
import { LANG } from "../language/lang";

export const httpPoint = {
    user: '/users/',
    files: '/files/',
    settings: '/settings/'
}

export const boxStyles = {
    backgroundColor: `${colors.tealDark[300]} `,
    borderRadius: '10px',
    padding: 2,
}

export const boxStylesBorder = {
    backgroundColor: `${colors.tealDark[300]} `,
    borderRadius: '10px',
    padding: 2,
    borderBottom: `1px solid ${colors.lime[500]}`
}

export const PRIVATE_STATUS = [
    { value: 'private', label: LANG("PRIVATE") },
    { value: 'public', label: LANG("PUBLIC") },
    { value: 'friends', label: LANG("FRIENDS") }
]


