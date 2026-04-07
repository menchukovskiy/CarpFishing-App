import { Box, Drawer, useMediaQuery } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { createContext } from 'react';
import AppRouter from '../routers/AppRouter'
import SideBar from './SideBar';
import TopBar from './TopBar';

export const LayoutContext = createContext({
    isMobile: false
});

const SIDEBAR_WIDTH = 250
const SIDEBAR_COLLAPSED_WIDTH = 80

const UI = () => {

    const sideBarRef = useRef(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // мобильный экран
    const isMobileLandscape = useMediaQuery(
        '(max-width:1000px) and (orientation: landscape)'
    );

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleDrawer = () => {
        if (drawerOpen) {
            setDrawerOpen(false)
        } else {
            setDrawerOpen(true)
        }
    }

    useEffect(() => {
        if (isMobileLandscape) {
            setIsCollapsed(true)
        }
    }, [isMobileLandscape])

    return (
        <>
            <LayoutContext.Provider value={{ isMobile }}>
                <BrowserRouter>
                    <Box
                        className='app_wrapper'
                        display='flex'
                        gap={3}
                        alignItems='stretch'
                    >

                        {/* Sidebar для десктопа */}
                        {!isMobile && (
                            <SideBar
                                isCollapsed={isCollapsed}
                                setIsCollapsed={setIsCollapsed}
                                mobile={false} />
                        )}

                        {/* Drawer для мобильных устройств */}
                        {isMobile && (
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                onClose={() => setDrawerOpen(false)}
                                PaperProps={{ style: { width: 250 } }}
                            >
                                <SideBar mobile={true} drawer={handleDrawer} />
                            </Drawer>
                        )}

                        <Box
                            sx={{
                                flexGrow: 1,

                            }}
                            className='main_content'
                            display='flex'
                            flexDirection='column'
                            gap={3}
                            overflow='hidden'
                        >
                            <TopBar />
                            <Box
                                display='flex'
                                flexDirection='column'
                                gap={3}
                                flexGrow={1}
                                overflow='scroll'
                            >
                                <AppRouter />
                            </Box>

                        </Box>

                    </Box>
                </BrowserRouter>
            </LayoutContext.Provider>
        </>
    );
};

export default UI;