import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import ContextMenu from './ContextMenu';

const UserBox = () => {
    const { user } = useSelector(state => state.user);
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
            <Box
                onClick={handleClick}
            >

                {
                    user?.avatar ? (
                        <> Автарка есть </>
                    ) : (
                        <Avatar>{user?.login?.charAt(0).toUpperCase()}</Avatar>
                    )
                }
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