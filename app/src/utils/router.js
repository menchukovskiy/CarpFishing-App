import { lazy } from 'react'
import { LANG } from "../language/lang";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Settings = lazy(() => import('../pages/Settings'))

const ROUTE = [
    {
        path: "/",
        type: "MenuItem",
        title: LANG('MENU_ITEM_DASHBOARD'),
        icon: <HomeOutlinedIcon />,
        component: <Dashboard />
    },

    {
        path: "/settings",
        type: "MenuItem",
        title: LANG('MENU_ITEM_SETTINGS'),
        icon: <SettingsIcon />,
        component: <Settings />
    },
]

export default ROUTE