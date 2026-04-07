import { boxStyles } from "../../utils/const";
import { Box, IconButton } from "@mui/material";
import { LayoutContext } from '../UI';
import { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu'
import { colors } from "../../theme";

const TopBar = ({ drawer }) => {

    const { isMobile } = useContext(LayoutContext)

    return (
        <>
            <Box
                display="flex"
                justifyContent={isMobile ? 'space-between' : 'end'}
                alignItems="center"
                className="topBar"
                gap={3}
            >
                {
                    isMobile && (
                        <>
                            <IconButton
                                sx={{
                                    backgroundColor: `${colors.tealDark[300]} !important`,
                                }}
                                onClick={drawer}
                            >
                                <MenuIcon />
                            </IconButton>
                        </>
                    )
                }
                <Box
                    sx={{
                        ...boxStyles
                    }}
                >

                </Box>
            </Box>


        </>

    );
};

export default TopBar;