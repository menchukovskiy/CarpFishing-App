import { Box, Typography, FormControl, FormHelperText, OutlinedInput } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useInput } from '../../../utils/hooks';
import { handleFetchUserInfo, handleUpdateUserInfo } from '../../../store/slice/settingsSlice.js';
import { LANG } from "../../../language/lang";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import i18n from "../../../utils/i18n";
import { getDatePickerConfig } from '../../../utils/datePickerConfig';
import SocialAccountsForm from "../../../components/SocialAccountsForm/index.js";
import { INITIAL_SOCIAL_ACCOUNTS } from "../../../utils/socialAccountsConfig.js";
import MainBtn from "../../../components/Buttons/MainBtn.js";

const AccauontForm = ({ isMobile }) => {

    const dispatch = useDispatch()
    const { user_info, errors } = useSelector(state => state.settings)
    const name = useInput(user_info.name || '', { isEmpty: false })
    const public_email = useInput(user_info.public_email || '', { isEmpty: false, isEmail: true })
    const phone = useInput(user_info.phone || '', { isEmpty: false })
    const bio = useInput(user_info.bio || '', { isEmpty: false })
    const birthday = useInput(user_info.birthday || '', { isEmpty: false })
    const maxBirthDate = dayjs().startOf('day').subtract(7, 'year')
    const { dayjsLocale, localeText } = getDatePickerConfig(i18n.language)
    const [socialAccounts, setSocialAccounts] = useState(
        user_info.social_accounts || INITIAL_SOCIAL_ACCOUNTS
    );

    const handleSocialChange = (platform, value) => {
        setSocialAccounts(prev => ({
            ...prev,
            [platform]: value.trim().toLowerCase() || null
        }));
    };

    const handleSubmit = () => {    
        const payload = {
            name: name.value,
            public_email: public_email.value,
            phone: phone.value,
            bio: bio.value,
            birthday: birthday.value,
            social_accounts: socialAccounts
        }

        dispatch(handleUpdateUserInfo(payload))
    }


    useEffect(() => {
        dispatch(handleFetchUserInfo())
    }, [dispatch])

    useEffect(() => {
        if (!user_info || Object.keys(user_info).length === 0) {
            return
        }

        name.set(user_info.name || '')
        public_email.set(user_info.public_email || '')
        phone.set(user_info.phone || '')
        bio.set(user_info.bio || '')
        birthday.set(user_info.birthday || '')
        setSocialAccounts({
            ...INITIAL_SOCIAL_ACCOUNTS,
            ...(user_info.social_accounts || {})
        })
       
    }, [user_info])


    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
            >

                <Box
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                    gap={2}
                    alignItems="start"
                >
                    <FormControl fullWidth variant="outlined">
                        <Typography variant="body1">{LANG('SETTINGS_ACCOUNT_NAME')}</Typography>
                        <OutlinedInput
                            fullWidth
                            value={name.value}
                            onChange={name.onChange}
                            placeholder={LANG('SETTINGS_ACCOUNT_NAME_PLACEHOLDER')}
                            error={!!errors?.name}
                        />
                        <FormHelperText>
                            <Typography variant="caption" >{LANG('SETTINGS_ACCOUNT_NAME_HELP')}</Typography>
                        </FormHelperText>
                        <FormHelperText>
                            {errors?.name && <Typography variant="caption" color={"red"}>{errors.name}</Typography>}
                        </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth variant="outlined">
                        <Typography variant="body1">{LANG('SETTINGS_ACCOUNT_BIRTHDAY')}</Typography>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale={dayjsLocale}
                            localeText={localeText}
                        >
                            <DatePicker
                                value={birthday.value ? dayjs(birthday.value) : null}
                                disableFuture
                                maxDate={maxBirthDate}
                                onChange={(nextValue) => {
                                    birthday.set(nextValue ? nextValue.format('YYYY-MM-DD') : '')
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        error: !!errors?.birthday,
                                        placeholder: LANG('SETTINGS_ACCOUNT_BIRTHDAY_PLACEHOLDER')
                                    }
                                }}
                            />
                        </LocalizationProvider>
                        <FormHelperText>
                            <Typography variant="caption" >{LANG('SETTINGS_ACCOUNT_BIRTHDAY_HELP')}</Typography>
                        </FormHelperText>
                        <FormHelperText>
                            {errors?.birthday && <Typography variant="caption" color={"red"}>{errors.birthday}</Typography>}
                        </FormHelperText>
                    </FormControl>
                </Box>

                <Box
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                    gap={2}
                    alignItems="start"
                >
                    <FormControl fullWidth variant="outlined">
                        <Typography variant="body1">{LANG('SETTINGS_ACCOUNT_EMAIL')}</Typography>
                        <OutlinedInput
                            fullWidth
                            value={public_email.value}
                            onChange={public_email.onChange}
                            placeholder={LANG('SETTINGS_ACCOUNT_EMAIL_PLACEHOLDER')}
                            error={!!errors?.public_email}
                        />
                        <FormHelperText>
                            <Typography variant="caption" >{LANG('SETTINGS_ACCOUNT_EMAIL_HELP')}</Typography>
                        </FormHelperText>
                        <FormHelperText>
                            {errors?.public_email && <Typography variant="caption" color={"red"}>{errors.public_email}</Typography>}
                        </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth variant="outlined">
                        <Typography variant="body1">{LANG('SETTINGS_ACCOUNT_PHONE')}</Typography>
                        <OutlinedInput
                            fullWidth
                            value={phone.value}
                            onChange={phone.onChange}
                            placeholder={LANG('SETTINGS_ACCOUNT_PHONE_PLACEHOLDER')}
                            error={!!errors?.phone}
                        />
                        <FormHelperText>
                            <Typography variant="caption" >{LANG('SETTINGS_ACCOUNT_PHONE_HELP')}</Typography>
                        </FormHelperText>
                        <FormHelperText>
                            {errors?.phone && <Typography variant="caption" color={"red"}>{errors.phone}</Typography>}
                        </FormHelperText>
                    </FormControl>
                </Box>

                <FormControl fullWidth variant="outlined">
                    <Typography variant="body1">{LANG('SETTINGS_ACCOUNT_BIO')}</Typography>
                    <OutlinedInput
                        fullWidth
                        value={bio.value}
                        onChange={bio.onChange}
                        placeholder={LANG('SETTINGS_ACCOUNT_BIO_PLACEHOLDER')}
                        error={!!errors?.bio}
                        multiline
                        minRows={3}
                    />
                    <FormHelperText>
                        <Typography variant="caption" >{LANG('SETTINGS_ACCOUNT_BIO_HELP')}</Typography>
                    </FormHelperText>
                    <FormHelperText>
                        {errors?.bio && <Typography variant="caption" color={"red"}>{errors.bio}</Typography>}
                    </FormHelperText>
                </FormControl>

                <Box>
                    <Typography variant="body1">{LANG('SETTINGS_ACCOUNT_SOCIAL')}</Typography>
                    <SocialAccountsForm
                        socialAccounts={socialAccounts}
                        onChange={handleSocialChange}
                        errors={errors?.socialAccounts || {}}

                    />
                </Box>

                <Box
                    display="flex"
                    justifyContent={isMobile ? "center" : "flex-start"}                
                >
                    <MainBtn 
                        title={LANG('SETTINGS_ACCOUNT_SAVE')}
                        onClick={handleSubmit}
                    />
                </Box>

            </Box>
        </>
    );
};

export default AccauontForm;