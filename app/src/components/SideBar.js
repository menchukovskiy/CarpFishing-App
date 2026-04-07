import { useState, useEffect } from "react"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Badge } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link, useLocation, useNavigate } from "react-router-dom"
import ROUTER from '../utils/router'
import CloseIcon from '@mui/icons-material/Close';
import { colors } from "../theme";

const SideBar = (props) => {

    const location = useLocation()
    const navigate = useNavigate()
    const [selected, setSelected] = useState((location.pathname.split('/')[1] ? location.pathname.split('/')[1] : '/'))

    useEffect(() => {
        const next = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : '/'
        setSelected(next)
    }, [location.pathname])

    return (
        <Box
            sx={{

                "& span.ps-active": {
                    color: `${colors.lime[500]} `
                },
                "& li.ps-active": {
                    backgroundColor: `${colors.tealDark[600]} `,
                    borderRadius: '10px'
                },
                "& .itemMenu li.ps-active:hover": {
                    backgroundColor: `${colors.tealDark[600]} `,
                    borderRadius: '10px'
                },
                "& .itemMenu.ps-menuitem-root:hover": {
                    backgroundColor: `${colors.tealDark[600]} `,
                    borderRadius: '10px',
                    color: `${colors.lime[500]} `
                },
                "& .itemMenu .ps-menu-button:hover": {
                    backgroundColor: 'transparent !important',
                },
                "& .itemMenu.ps-sidebar-root": {
                    border: 'none !important'
                },
                "& .itemMenuCollapse ": {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                "& .itemMenuCollapse .ps-menu-icon": {
                    marginRight: 0
                },
                "& .ps-sidebar-container": {
                    backgroundColor: `${colors.tealDark[300]} !important`
                },
                "& .topItem .ps-menu-button:hover" :{
                    backgroundColor: `transparent !important`,
                }
            }}
        >

            <Sidebar
                rootStyles={{
                    backgroundColor: `${colors.tealDark[400]}`,
                    border: 'none !important',
                    borderRadius: props.mobile ? 0 : '10px',
                    overflow: 'hidden',
                    height: props.mobile ? '100vh' : '100%'
                }}
                p={2}
                
                collapsed={props.isCollapsed} >
                <Menu>
                    {!props.mobile && (
                        <MenuItem
                            className="topItem"
                            onClick={() => props.setIsCollapsed(!props.isCollapsed)}
                            icon={props.isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        >
                            {!props.isCollapsed && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml="15px">
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        gap="5px"
                                    >

                                    </Box>

                                    <IconButton>
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                            )}

                        </MenuItem>
                    )}

                    {props.mobile && (
                        <MenuItem
                            onClick={props.drawer}
                            className="topItem"
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px">
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    gap="5px"
                                >

                                </Box>

                                <IconButton>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </MenuItem>
                    )}

                    <Box p={2} >
                        {ROUTER.map(({ path, title, icon, type }, key) =>
                            <Box key={key} p={0.1}>
                                {

                                    (type === 'Route') ? null :

                                        <MenuItem
                                            className={props.isCollapsed ? "itemMenu itemMenuCollapse" : "itemMenu"}
                                            component={<Link to={path} />}
                                            icon={icon}
                                            key={path}
                                            active={selected === path || '/' + selected === path}
                                            onClick={() => {
                                                setSelected(path)
                                                if (props.mobile && typeof props.drawer === 'function') props.drawer()
                                            }}
                                        >
                                            {!props.isCollapsed && (
                                                <Box>{title}</Box>
                                            )}

                                        </MenuItem>


                                }
                            </Box>
                        )}


                    </Box>
                </Menu>
            </Sidebar>

        </Box>
    );
};

export default SideBar;