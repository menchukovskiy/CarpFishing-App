import { Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material';
import CONTEXT_MENU from '../../utils/contextMenu';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slice/userSlice';
import { useNavigate } from "react-router-dom";
import ROUTER from '../../utils/router'

const ContextMenu = ( { anchorEl, open, handleClose } ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlers = {
        profile: () => {
            const settingsRoute = ROUTER.find(route => route.name === "Settings");
            if (settingsRoute) {
                const profileRoute = settingsRoute.children.find(child => child.name === "AccountSettings");
                if (profileRoute) {
                    navigate(`${settingsRoute.path}/${profileRoute.path}`);
                }
            }
        },
        settings: () => {
            const settingsRoute = ROUTER.find(route => route.name === "Settings");
            if (settingsRoute) {
                navigate(settingsRoute.path);
            }
        },
        logout: () => {
            dispatch(removeUser());
        }
    };

    const handleAction = (action) => {
        const handler = handlers[action];
        if (handler) {
            handler();
        }
        handleClose();
    }

    return (
        <Menu
                id="context-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                autoFocus={false}
                disableAutoFocusItem
                slotProps={{
                    list: {
                        'aria-labelledby': 'context-button',
                        autoFocusItem: false,
                    },
                }}
            >
                {CONTEXT_MENU.map((item, index) => {
                    if (item.type === "MenuItem") {
                        return (
                            <MenuItem key={index} onClick={() => handleAction(item.action)}>
                                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                                {item.title && <ListItemText primary={item.title} />}
                            </MenuItem>
                        );
                    } else if (item.type === "Divider") {
                        return <Divider key={index} />;
                    }
                    return null;
                })}
            </Menu>
    );
};

export default ContextMenu;