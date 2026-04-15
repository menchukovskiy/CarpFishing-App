import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { getImage } from '../utils/getImage';
import { useEffect, useState } from 'react';

const AvatarBox = ({ size = 40 }) => {
    const { user, avatarVersion } = useSelector(state => state.user);
    const [avatarSrc, setAvatarSrc] = useState(null);

    useEffect(() => {
        if (user?.avatar) {
            let cancelled = false;
            getImage('users_avatar', user.avatar).then((url) => {
                if (!cancelled) setAvatarSrc(url);
            });
            return () => { cancelled = true; };
        } else {
            setAvatarSrc(null);
        }
    }, [user?.avatar, avatarVersion]);

    return (
        <>
            {
                    user?.avatar ? (
                        <Avatar
                            src={avatarSrc}
                            alt="User Avatar"
                            sx={{ width: size, height: size }}
                        />
                    ) : (
                        <Avatar sx={{ width: size, height: size }}>
                            <Typography fontSize={size/2}>
                            {user?.login?.charAt(0).toUpperCase()}
                            </Typography>
                        </Avatar>
                    )
                }
        </>
    );
};

export default AvatarBox;