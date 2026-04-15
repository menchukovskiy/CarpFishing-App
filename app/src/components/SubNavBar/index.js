import { LayoutContext } from '../UI';
import { useContext, useState } from 'react';
import ROUTE from '../../utils/router';
import './index.css';
import { Box, Button, Link, Typography, Menu, MenuItem } from '@mui/material';
import { colors } from "../../theme";
import { useLocation } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const SubNavBar = ({ page }) => {

    const { isMobile } = useContext(LayoutContext)
    const location = useLocation()

    const currentRoute = ROUTE.find(route => route.name === page);
    const subRoutes = currentRoute && currentRoute.children ? currentRoute.children : [];

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {
                !isMobile && subRoutes.length > 0 && (

                    <Box
                        className="sub-nav-bar"
                        display="flex"
                        flexDirection="row"
                        gap={3}
                        sx={{
                            borderBottom: `1px solid ${colors.tealDark[700]}`
                        }}
                    >
                        {subRoutes.map((subRoute, index) => {
                            const path = subRoute.path !== "" ? `${currentRoute.path}/${subRoute.path}` : currentRoute.path
                            const isActive = location.pathname === path
                            return (
                                <Link
                                    key={index}
                                    href={path}
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
                                </Link>
                            )
                        }
                        )}
                    </Box>
                )
            }

            {
                isMobile && subRoutes.length > 0 && (
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={2}
                    >
                        <Typography variant="h6">{currentRoute.title || currentRoute.name}</Typography>
                        <Button
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
                                    'aria-labelledby': 'sub-mobile-menu',
                                },
                                paper: {
                                    sx: {
                                        minWidth: anchorEl?.clientWidth,
                                    },
                                },
                            }}
                        >
                            {
                                subRoutes.map((subRoute, index) => {
                                    const path = subRoute.path !== "" ? `${currentRoute.path}/${subRoute.path}` : currentRoute.path
                                    return (
                                        <MenuItem
                                            key={index}
                                            onClick={handleClose}
                                            component="a"
                                            href={path}
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