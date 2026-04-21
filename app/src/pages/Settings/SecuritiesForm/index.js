import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { LANG } from '../../../language/lang';
import { useEffect, useState } from "react";
import { handleFetchUserSecurities, handleUpdateUserSecurities } from '../../../store/slice/settingsSlice.js';
import './style.css';
import { colors } from "../../../theme.js";
import { PRIVATE_STATUS } from "../../../utils/const.js";
import MainBtn from "../../../components/Buttons/MainBtn.js";



const SecuritiesForm = ({ isMobile }) => {
    const dispatch = useDispatch()
    const { user_securities } = useSelector(state => state.settings)
    const [securities, setSecurities] = useState([])
    const [disabled, setDisabled] = useState(false)

    const handleChange = (key, value) => {

        if (key === 'profile_type') {
            if (value === 'private') {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        }

        setSecurities(prev => {
            const updated = prev.map(sec => {
                if (sec[key] !== undefined) {
                    return { ...sec, [key]: value }
                }
                return sec
            })
            return updated
        })
    }

    const handleSubmit = () => {
        dispatch(handleUpdateUserSecurities(securities[0]))
    }   

    useEffect(() => {
        dispatch(handleFetchUserSecurities())
    }, [dispatch])

    useEffect(() => {
        if (!user_securities || user_securities.length === 0) {
            return
        }
        setSecurities(user_securities)
        if (user_securities[0].profile_type === 'private') {
            setDisabled(true)
        } 

    }, [user_securities])

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="stretch"
            >

                {securities[0] && Object.entries(securities[0]).map(([key, value]) => (

                    <Box
                        key={key}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={2}
                        className="settings-field"
                        sx={{
                            borderColor: `${colors.tealDark[600]} `
                        }}
                        pb={2}
                    >
                        <Typography variant="body1">{LANG(`SETTINGS_ACCOUNT_${key.toUpperCase()}`)}</Typography>

                        <FormControl sx={{ width: '150px' }} variant="outlined">



                            <Select
                                value={value || 'public'}
                                onChange={(e) => handleChange(key, e.target.value)}
                                disabled={key === 'profile_type' ? false : disabled}
                            >


                                {
                                    key === 'profile_type' ?
                                        [
                                            (
                                                <MenuItem key={`${key}-public`} value="public">
                                                    {LANG("ACCOUNT_PUBLIC")}
                                                </MenuItem>
                                            ),
                                            (
                                                <MenuItem key={`${key}-private`} value="private">
                                                    {LANG("ACCOUNT_PRIVATE")}
                                                </MenuItem>
                                            )
                                        ]
                                        :
                                        PRIVATE_STATUS.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                }
                            </Select>

                        </FormControl>

                    </Box>

                ))}

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
                />

            </Box>
            </Box >
        </>
    );
};

export default SecuritiesForm;