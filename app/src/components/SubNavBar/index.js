import { LayoutContext } from '../UI';
import { useContext, useState } from 'react';
import ROUTE from '../../utils/router';
import './index.css';
import { Box, Button, Typography, Menu, MenuItem } from '@mui/material';
import { colors } from "../../theme";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { matchPath } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const SubNavBar = ({ page }) => {

    const { isMobile } = useContext(LayoutContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const currentRoute = ROUTE.find(route => route.name === page);
    if (!currentRoute) return null;
    const subRoutes = currentRoute.children ?? [];


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMobileNavigate = (path) => {
        handleClose();
        setTimeout(() => {
            navigate(path);
        }, 0);
    };

    const buildChildPath = (childPath) =>
        childPath ? `${currentRoute.path}/${childPath}` : currentRoute.path;

    const activeChild = subRoutes.find((item) => {
        const pattern = buildChildPath(item.path);
        return !!matchPath({ path: pattern, end: true }, location.pathname);
    });


    const isInsideCurrentSection =
        location.pathname === currentRoute.path ||
        location.pathname.startsWith(`${currentRoute.path}/`);

    if (isInsideCurrentSection) {
        if (!activeChild) return null;
        if (activeChild.showInSubNav === false) return null;
    }

    const menuItems = subRoutes.filter(item => item.type === "MenuItem");

    return (
        <>
            {
                !isMobile && menuItems.length > 0 && (

                    <Box
                        className="sub-nav-bar"
                        display="flex"
                        flexDirection="row"
                        gap={3}
                        sx={{
                            borderBottom: `1px solid ${colors.tealDark[700]}`
                        }}
                    >
                        {menuItems.map((subRoute, index) => {
                            const path = subRoute.path !== "" ? `${currentRoute.path}/${subRoute.path}` : currentRoute.path
                            const isActive = location.pathname === path
                            return (
                                <MuiLink
                                    key={index}
                                    component={RouterLink}
                                    to={path}
                                    className={`sub-nav-link ${isActive ? 'active' : ''}`}
                                    sx={{
                                        color: colors.tealDark[900],
                                        '&:hover': {
                                            color: `${colors.lime[500]}`,
                                        },
                                        '&.active': {
                                            color: `${colors.lime[500]}`
                                        },
                                        '&.active::after': {
                                            backgroundColor: `${colors.lime[500]}`
                                        }
                                    }}
                                >
                                    {subRoute.title || subRoute.name}
                                </MuiLink>
                            )

                        }
                        )}
                    </Box>
                )
            }

            {
                isMobile && menuItems.length > 0 && (
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={2}
                    >
                        <Typography variant="h6">{currentRoute.title || currentRoute.name}</Typography>
                        <Button
                            id="sub-mobile-menu-button"
                            aria-controls={open ? 'sub-mobile-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            variant='contained'
                            endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            sx={{
                                backgroundColor: colors.tealDark[900],
                                '&:hover': {
                                    backgroundColor: colors.tealDark[700],
                                }
                            }}
                        >
                            {subRoutes.find(item => (location.pathname === `${currentRoute.path}/${item.path}`) || (location.pathname === currentRoute.path && item.path === ""))?.title || 'Оберіть сторінку'}
                        </Button>
                        <Menu
                            id="sub-mobile-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            slotProps={{
                                list: {
                                    'aria-labelledby': 'sub-mobile-menu-button',
                                },
                                paper: {
                                    sx: {
                                        minWidth: anchorEl?.clientWidth,
                                    },
                                },
                            }}
                        >
                            {
                                menuItems.map((subRoute, index) => {
                                    const path = subRoute.path !== "" ? `${currentRoute.path}/${subRoute.path}` : currentRoute.path
                                    return (
                                        <MenuItem
                                            key={index}
                                            onClick={() => handleMobileNavigate(path)}
                                            selected={location.pathname === path}
                                        >
                                            {subRoute.title || subRoute.name}
                                        </MenuItem>
                                    )

                                })
                            }

                        </Menu>
                    </Box>
                )
            }



        </>
    );
};

export default SubNavBar;