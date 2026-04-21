import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import { LANG } from '../../../language/lang';
import { useInput } from '../../../utils/hooks';
import { clearErrors, handleChangeEmailAndPassword } from '../../../store/slice/userSlice.js';
import MainBtn from "../../../components/Buttons/MainBtn";


const MainForm = ({ isMobile }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { errors } = useSelector(state => state.user)
    const email = useInput(user?.email || '', { isEmpty: true, isEmail: true })
    const password = useInput('', { isEmpty: false, minLength: 8 })
    const login = user?.login || '';

    const handleSubmit = () => {
        if (email.inputValid && password.inputValid) {
            dispatch(handleChangeEmailAndPassword({ email: email.value, password: password.value }))
        } else {
             dispatch(clearErrors())
        }
    }

    return (
        <>
            <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                gap={2}
                alignItems="start"
            >
                <FormControl fullWidth variant="outlined">
                    <Typography variant="body1">{LANG('SETTINGS_ACCOUNT_LOGIN')}</Typography>
                    <OutlinedInput
                        fullWidth
                        value={login}
                        disabled={true}
                    />
                    <FormHelperText>
                        <Typography variant="caption" >{LANG('SETTINGS_ACCOUNT_LOGIN_HELP')}</Typography>
                    </FormHelperText>
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <Typography variant="body1">{LANG('SETTINGS_ACCOUNT_MAIN_EMAIL')}</Typography>
                    <OutlinedInput
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
                    <FormHelperText>
                        <Typography variant="caption" >{LANG('SETTINGS_ACCOUNT_MAIN_EMAIL_HELP')}</Typography>
                    </FormHelperText>
                    {email.getError() && <FormHelperText sx={{ maxWidth: '300px' }} error>{email.getError()}</FormHelperText>}
                    {errors?.email && <FormHelperText sx={{ maxWidth: '300px' }} error>{errors?.email.message}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <Typography variant="body1">{LANG('SETTINGS_ACCOUNT_PASSWORD')}</Typography>
                    <OutlinedInput
                        fullWidth
                        value={password.value}
                        onBlur={(e) =>{
                            password.onBlur(e)
                        } }
                        onChange={
                            (e) => password.onChange(e)
                        }
                        placeholder={LANG('SETTINGS_ACCOUNT_PASSWORD_PLACEHOLDER')}
                        error={!!errors?.password || !!password.getError()}
                    />
                    <FormHelperText>
                        <Typography variant="caption" >{LANG('SETTINGS_ACCOUNT_PASSWORD_HELP')}</Typography>
                    </FormHelperText>
                    <FormHelperText>
                        {password.getError() && <Typography variant="caption" color={"red"}>{password.getError()}</Typography>}
                        {errors?.password && <Typography variant="caption" color={"red"}>{errors.password}</Typography>}
                    </FormHelperText>
                </FormControl>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                justifyContent="center"
                alignItems="center"
                mb={2}
                mt={2}
            >
                <MainBtn
                    onClick={handleSubmit}
                    title={LANG('SETTINGS_ACCOUNT_SAVE_BTN')}
                    disabled={!password.inputValid || !email.inputValid}
                />

            </Box>
        </>
    );
};

export default MainForm;