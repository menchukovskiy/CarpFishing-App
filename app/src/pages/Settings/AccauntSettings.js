import { LayoutContext } from '../../components/UI';
import { useContext, useState } from 'react';
import { boxStyles, boxStylesBorder } from '../../utils/const';
import { Box, Typography } from '@mui/material';
import { LANG } from '../../language/lang';
import AccauntPicture from './AccauntPicture';
import AccauontForm from './AccauntForm';

const AccauntSettings = () => {
    const { isMobile } = useContext(LayoutContext)

    return (
        <>
            <Box
                display="flex"
                flexDirection={isMobile ? "column-reverse" : "row"}
                gap={3}
            >

                <Box
                    sx={{...boxStylesBorder, flex:1}}
                >
                    <Typography variant="h6" mb={1}>{LANG("TITLE_AS_USER")}</Typography>
                    <AccauontForm isMobile={isMobile} />
                </Box>

                <Box
                >
                    <Typography variant="h6" mb={1}>{LANG("TITLE_PROFILE_PICTURE")}</Typography>
                    <AccauntPicture />
                </Box>

            </Box>
        </>
    );
};

export default AccauntSettings;