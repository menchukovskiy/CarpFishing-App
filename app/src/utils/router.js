import { lazy } from 'react'
import { LANG } from "../language/lang";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Settings = lazy(() => import('../pages/Settings'))
const MainSettings = lazy(() => import('../pages/Settings/MainSettings'))
const AccauntSettings = lazy(() => import('../pages/Settings/AccauntSettings'))

const ROUTE = [
    {
        path: "/",
        type: "MenuItem",
        title: LANG('MENU_ITEM_DASHBOARD'),
        icon: <HomeOutlinedIcon />,
        component: <Dashboard />,
        name: "Dashboard"
    },

    {
        path: "/settings",
        type: "MenuItem",
        title: LANG('MENU_ITEM_SETTINGS'),
        icon: <SettingsIcon />,
        component: <Settings />,
        name: "Settings",
        children: [
            { 
                path: "", 
                component: <MainSettings />, 
                name: "MainSettings",
                title: LANG('SETTINGS_MAIN_SETTINGS') 
            },
            { 
                path: "account", 
                component: <AccauntSettings />, 
                name: "AccauntSettings",
                title: LANG('SETTINGS_ACCOUNT_SETTINGS') 
            }
        ]
    },
]

export default ROUTE