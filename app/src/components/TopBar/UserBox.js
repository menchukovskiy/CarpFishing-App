import { Box } from '@mui/material';

import { useState } from 'react';
import ContextMenu from './ContextMenu';
import AvatarBox from '../AvatarBox';

const UserBox = () => {
    
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
            <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
              <AvatarBox size={40} />
            </Box>

            <ContextMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
            />


        </>
    );
};

export default UserBox;