import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

const AvatarBox = ({ size = 40 }) => {
    const { user } = useSelector(state => state.user);
    return (
        <>
            {
                    user?.avatar ? (
                        <> Автарка есть </>
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