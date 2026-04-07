
import { LANG } from "../../language/lang";
import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import {useSelector } from 'react-redux'
import Loading from "../Loading";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { isLoading } = useSelector(state => state.user);

    return (
        <>
            { isLoading && <Loading /> }
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Card sx={{ minWidth: 400, padding: 3 }}>
                    <Typography variant="h6" align="center" gutterBottom>
                        {isLogin
                            ? LANG('TEXT_SIGNIN')
                            : LANG('TEXT_SIGNUP')
                        }
                    </Typography>

                    {isLogin ? <LoginForm /> : <RegisterForm />}

                    <Box p={1} display='flex' justifyContent='center' alignItems='center'>
                        <Button
                            sx={{ textTransform: "none" }}
                            variant="text"
                            onClick={() => setIsLogin((prev) => !prev)}
                        >
                            {isLogin
                                ? LANG('TEXT_BTN_REG_Q')
                                : LANG('TEXT_BTN_SIGNIN_Q')
                            }
                        </Button>
                    </Box>
                </Card>



            </Box>
        </>
    );
};

export default AuthForm;