import { LayoutContext } from '../../components/UI';
import { useContext, useState } from 'react';
import { boxStyles, boxStylesBorder } from '../../utils/const';
import { Box, Typography } from '@mui/material';
import { LANG } from '../../language/lang';
import AccauntPicture from './AccauntPicture';

const AccountSettings = () => {
    const { isMobile } = useContext(LayoutContext)

    return (
        <>
            <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                gap={3}
            >

                <Box
                    sx={boxStylesBorder}
                >
                    <Typography variant="h6">{LANG("TITLE_AS_USER")}</Typography>
                </Box>

                <Box
                >
                    <Typography variant="h6">{LANG("TITLE_PROFILE_PICTURE")}</Typography>
                    <AccauntPicture />
                </Box>

            </Box>
        </>
    );
};

export default AccountSettings;