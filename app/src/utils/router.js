import { lazy } from 'react'
import { LANG } from "../language/lang";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsIcon from '@mui/icons-material/Settings';
import SetMealIcon from '@mui/icons-material/SetMeal';

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Settings = lazy(() => import('../pages/Settings'))
const MainSettings = lazy(() => import('../pages/Settings/MainSettings'))
const AccauntSettings = lazy(() => import('../pages/Settings/AccauntSettings'))
const Fishing = lazy(() => import('../pages/Fishing'))
const ComplitedFishing = lazy(() => import('../pages/Fishing/ComplitedFishing'))
const PlanningFishing = lazy(() => import('../pages/Fishing/PlanningFishing'))
const AddFishing = lazy(() => import('../pages/Fishing/Action/add'))

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
                title: LANG('SETTINGS_MAIN_SETTINGS'),
                type: "MenuItem",
                showInSubNav: true
            },
            { 
                path: "account", 
                component: <AccauntSettings />, 
                name: "AccauntSettings",
                title: LANG('SETTINGS_ACCOUNT_SETTINGS'),
                type: "MenuItem",
                showInSubNav: true
            }
        ]
    },

    {
        path: "/my-fishing",
        type: "MenuItem",
        title: LANG('MENU_ITEM_FISHING'),
        icon: <SetMealIcon />,
        component: <Fishing />,
        name: "Fishing",
        children: [
            { 
                path: "", 
                component: <ComplitedFishing />, 
                name: "ComplitedFishing",
                title: LANG('FISHING_COMPLITED'),
                type: "MenuItem",
                showInSubNav: true 
            },
            { 
                path: "planning", 
                component: <PlanningFishing />, 
                name: "PlanningFishing",
                title: LANG('FISHING_PLANNING'),
                type: "MenuItem",
                showInSubNav: true 
            },
            { 
                path: "add", 
                component: <AddFishing />, 
                name: "AddFishing",
                title: LANG('FISHING_ADD'),
                type: "Route",
                showInSubNav: false 
            },
        ]
    }
]

export default ROUTE