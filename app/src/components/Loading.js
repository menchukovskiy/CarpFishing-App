import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material';

const Loading = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            minWidth="100vw"
            position="fixed"
            top={0}
            left={0}
            bottom={0}
            right={0}
            zIndex={9999}
            backgroundColor="#051819bc"
        >
            <CircularProgress color='secondary'/>
        </Box>
    );
};

export default Loading;