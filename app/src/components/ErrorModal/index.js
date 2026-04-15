import { Box, Dialog, DialogContent, Button, DialogTitle } from "@mui/material";
import { LANG } from "../../language/lang";

const ErrorModal = ( props ) => {

    return (
          <Dialog
            open={props.open}
            aria-labelledby="form-dialog-title"
            sx={{
                '& .MuiPaper-root': {
                    minWidth: '300px !important'
                }
            }}
        >
            <DialogTitle sx={{textAlign:'center'}}>
                {LANG("ERROR_TITLE")}
            </DialogTitle>

            <DialogContent className='success_message'>
                {props.message}
            </DialogContent>

            <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                    sx={{
                        marginBottom: '15px'
                    }}
                    variant="contained" color="success"
                    onClick={ () => {
                     
                        props.onClick()
                    } }
                >
                    {LANG("BTN_CLOSE")}
                </Button>
            </Box>

        </Dialog>
    );
};

export default ErrorModal;