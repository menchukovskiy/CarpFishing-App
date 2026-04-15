import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from 'react';
import { LANG } from "../../../language/lang";
import EditIcon from '@mui/icons-material/Edit';
import BackupIcon from '@mui/icons-material/Backup';
import DeleteIcon from '@mui/icons-material/Delete';


const ActionMenu = ( { hasAvatar, onUploadClick, onDeleteClick } ) => {

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
            <Button
                aria-controls={open ? 'action-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ textTransform: "none" }}
                startIcon={<EditIcon fontSize="small" />}
                variant="contained"
                size="small"
            >
                {LANG("BTN_EDIT")}
            </Button>
            <Menu
                id="action-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); onUploadClick(); }}>
                    <ListItemIcon>
                        <BackupIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={LANG("UPLOAD_PHOTO")} />
                </MenuItem>
                {
                    hasAvatar &&
                    <MenuItem onClick={() => { handleClose(); onDeleteClick(); }}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={LANG("DELETE_PHOTO")} />
                    </MenuItem>
                }

            </Menu>

        </>
    );
};

export default ActionMenu;