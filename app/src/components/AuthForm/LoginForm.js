import {
    Box,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MainBtn from '../Buttons/MainBtn';
import { LANG } from '../../language/lang';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { useInput } from '../../utils/hooks';
import { clearErrors, handleLogin } from '../../store/slice/userSlice'

const LoginForm = () => {

    const dispatch = useDispatch()

    const { errors, globalError } = useSelector(state => state.user)
    const [showPassword, setShowPassword] = useState(false);
    const login = useInput('', { isEmpty: true })
    const password = useInput('', { isEmpty: true, minLength: 8 })

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = () => {
            if (login.inputValid && password.inputValid ) {
                dispatch(handleLogin({ login: login.value, password: password.value }))
            }
        }
    return (
        <CardContent>
            <Box
                    sx={{ width: '100%' }}
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    gap={2}
                >
                    {globalError && <Typography sx={{ textAlign: 'center', width: '100%', display: 'block' }} variant="caption" color={"red"}>{globalError.message}</Typography>}

                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-login">{LANG('TEXT_LABEL_LOGIN')}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-login"
                            label={LANG('TEXT_LABEL_LOGIN')}
                            onChange={e => {
                                if (errors?.login) {
                                    dispatch(clearErrors())
                                }
                                login.onChange(e)
                            }}
                            onBlur={e => login.onBlur(e)}
                            value={login.value}
                            error={!!errors?.login || !!login.getError()}
                        />
                        {login.getError() && <FormHelperText sx={{ maxWidth: '300px' }} error>{login.getError()}</FormHelperText>}
                        {errors?.login && <FormHelperText sx={{ maxWidth: '300px' }} error>{errors?.login.message}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{LANG('TEXT_LABEL_PASSWORD')}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            label={LANG('TEXT_LABEL_PASSWORD')}
                            value={password.value}
                            error={!!password.getError() || (password.isDirty && password.minLength && password.value.length > 0)}
                            onBlur={e => password.onBlur(e)}
                            onChange={
                                (e) => password.onChange(e)
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }

                        />
                        {password.getError() && <FormHelperText sx={{ maxWidth: '300px' }} error>{password.getError()}</FormHelperText>}
                        {errors?.password && <FormHelperText sx={{ maxWidth: '300px' }} error>{errors?.password.message}</FormHelperText>}

                    </FormControl>

                   

                    <MainBtn
                        title={LANG('TEXT_BTN_SIGNIN')}
                        onClick={handleSubmit}
                        disabled={!login.inputValid || !password.inputValid }
                    />
                </Box>
        </CardContent>
    );
};

export default LoginForm;