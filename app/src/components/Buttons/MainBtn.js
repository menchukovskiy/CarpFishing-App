import { Button } from "@mui/material";

const MainBtn = (props) => {
    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={props.onClick}
            disabled={props.disabled ? props.disabled : false}
        >
            {props.title}
        </Button>
    );
};

export default MainBtn;