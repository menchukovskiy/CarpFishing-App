import { Box, Typography, FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import { LayoutContext } from '../../components/UI';
import { useContext } from 'react';
import { boxStylesBorder } from '../../utils/const';
import { LANG } from '../../language/lang';
import MainForm from './MainForm';
import SecuritiesForm from './SecuritiesForm';

const MainSettings = () => {

   
    const { isMobile } = useContext(LayoutContext)
    

    return (

        <Box
            display="flex"
            flexDirection="column"
            gap={3}
        >
            <Box
                sx={{ ...boxStylesBorder, flex: 1 }}
            >
                <Typography variant="h6" mb={1}>{LANG("TITLE_AS_SETTINGS")}</Typography>
                <MainForm isMobile={isMobile} />
            </Box>

            <Box
                sx={{ ...boxStylesBorder, flex: 1 }}
            >
                <Typography variant="h6" mb={1}>{LANG("TITLE_AS_SECURITIES")}</Typography>
                <SecuritiesForm isMobile={isMobile} />
            </Box>

        </Box>
    );
};

export default MainSettings;