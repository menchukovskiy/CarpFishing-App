import { Box, Menu, MenuItem } from '@mui/material';
import { LANG } from '../../language/lang';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';

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
    console.log(user)

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

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>


        </>
    );
};

export default UserBox;