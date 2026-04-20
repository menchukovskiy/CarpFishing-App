import { Box, FormControl, FormHelperText, OutlinedInput, Typography } from "@mui/material";
import { SOCIAL_PLATFORMS } from "../../utils/socialAccountsConfig";

const SocialAccountsForm = ( { socialAccounts, onChange, errors } ) => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>

            {Object.entries(SOCIAL_PLATFORMS).map(([platformKey, config]) => (
                <FormControl key={platformKey} error={!!errors[platformKey]}>
                    
                    <OutlinedInput
                        value={socialAccounts[platformKey] || ''}
                        onChange={(e) => onChange(platformKey, e.target.value)}
                        placeholder={config.placeholder}
                        startAdornment={config.icon}
                    />
                    {errors[platformKey] && <FormHelperText>{errors[platformKey]}</FormHelperText>}
                </FormControl>
            ))}
        </Box>
    );
};

export default SocialAccountsForm;