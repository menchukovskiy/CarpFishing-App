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
import { useState } from 'react';
import { useInput } from '../../utils/hooks';
import { useDispatch, useSelector } from 'react-redux'
import { handleRegistration, clearErrors } from '../../store/slice/userSlice'

const RegisterForm = () => {

    const dispatch = useDispatch()

    const { errors, globalError } = useSelector(state => state.user)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [showPassword, setShowPassword] = useState(false);
    const login = useInput('', { isEmpty: true })
    const password = useInput('', { isEmpty: true, minLength: 8 })
    const confirmPassword = useInput('', { isEmpty: true, minLength: 8, isSame: password.value })
    const email = useInput('', { isEmpty: true, isEmail: true })

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
        if (login.inputValid && password.inputValid && confirmPassword.inputValid && email.inputValid) {
            dispatch(handleRegistration({ login: login.value, password: password.value, email: email.value, timezone }))
        }
    }

    return (
        <>
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
                        <InputLabel htmlFor="outlined-adornment-email">{LANG('TEXT_LABEL_EMAIL')}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            label={LANG('TEXT_LABEL_EMAIL')}
                            onChange={e => {
                                if (errors?.email) {
                                    dispatch(clearErrors())
                                }
                                email.onChange(e)
                            }}
                            onBlur={e => email.onBlur(e)}
                            value={email.value}
                            error={!!errors?.email || !!email.getError()}
                        />
                        {email.getError() && <FormHelperText sx={{ maxWidth: '300px' }} error>{email.getError()}</FormHelperText>}
                        {errors?.email && <FormHelperText sx={{ maxWidth: '300px' }} error>{errors?.email.message}</FormHelperText>}
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
                    </FormControl>

                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-confirmPassword">{LANG('TEXT_LABEL_PASSWORD_2')}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            label={LANG('TEXT_LABEL_PASSWORD_2')}
                            value={confirmPassword.value}
                            onBlur={e => confirmPassword.onBlur(e)}
                            error={!!confirmPassword.getError() || (confirmPassword.isDirty && confirmPassword.minLength && confirmPassword.value.length > 0)}
                            onChange={
                                (e) => confirmPassword.onChange(e)
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
                        {confirmPassword.getError() && <FormHelperText sx={{ maxWidth: '300px' }} error>{
                            confirmPassword.getError() === LANG('ERROR_TEXT_DO_NOT_MATCH') ? LANG('PASSWORD_ERROR_CONFIRM') : confirmPassword.getError()
                        }</FormHelperText>}

                    </FormControl>

                    <MainBtn
                        title={LANG('TEXT_BTN_REGISTER')}
                        onClick={handleSubmit}
                        disabled={!login.inputValid || !password.inputValid || !confirmPassword.inputValid || !email.inputValid}
                    />
                </Box>





            </CardContent>


        </>
    );
};

export default RegisterForm;