import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export const SOCIAL_PLATFORMS = {
  facebook: {
    label: 'Facebook',
    placeholder: 'facebook.com/username',
    icon: <FacebookIcon sx={{mr: 1}} />,
    baseUrl: 'https://facebook.com',
    urlPattern: '^[a-zA-Z0-9._-]{1,}$'
  },
  instagram: {
    label: 'Instagram',
    placeholder: '@username',
    icon: <InstagramIcon sx={{mr: 1}} />,
    baseUrl: 'https://instagram.com',
    urlPattern: '^[a-zA-Z0-9._]{1,30}$'
  },
  youtube: {
    label: 'YouTube',
    placeholder: '@channel_name',
    icon: <YouTubeIcon sx={{mr: 1}} />,
    baseUrl: 'https://youtube.com/@',
    urlPattern: '^[a-zA-Z0-9._-]{1,}$'
  }
};

export const INITIAL_SOCIAL_ACCOUNTS = {
  facebook: null,
  instagram: null,
  youtube: null
};

/**
 * Валідація username для платформи
 * @param {string} platform - платформа (facebook, instagram, youtube)
 * @param {string} username - username для перевірки
 * @returns {boolean} - валідний або ні
 */
export const validateSocialUsername = (platform, username) => {
  if (!username) return true; 
  
  const config = SOCIAL_PLATFORMS[platform];
  if (!config) return false;
  
  const regex = new RegExp(config.urlPattern);
  return regex.test(username);
};

/**
 * Отримати URL профілю
 * @param {string} platform - платформа
 * @param {string} username - username
 * @returns {string|null} - URL або null
 */
export const getSocialProfileUrl = (platform, username) => {
  if (!username) return null;
  
  const config = SOCIAL_PLATFORMS[platform];
  if (!config) return null;
  
  const baseUrl = config.baseUrl;
  
  switch (platform) {
    case 'facebook':
      return `${baseUrl}/${username}`;
    case 'instagram':
      return `${baseUrl}/${username}`;
    case 'youtube':
      return `${baseUrl}${username}`;
    default:
      return null;
  }
};

export default SOCIAL_PLATFORMS;
