import { LANG } from "../language/lang";

import { useDispatch } from "react-redux";

import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';



const CONTEXT_MENU = [
    {
        type: "MenuItem",
        title: LANG('CONTEXT_MENU_PROFILE'),
        icon: <PersonIcon fontSize="small"/>,
        action: "profile"
    },
    {
        type: "MenuItem",
        title: LANG('CONTEXT_MENU_SETTINGS'),
        icon: <SettingsIcon fontSize="small"/>,
        action: "settings"
    },
    {
        type: "Divider"
    },
    {
        type: "MenuItem",
        title: LANG('CONTEXT_MENU_LOGOUT'),
        icon: <ExitToAppIcon fontSize="small"/>,
        action: "logout"
    },
]


export default CONTEXT_MENU