import "dayjs/locale/ru";
import "dayjs/locale/uk";


const LANGUAGE_DATE_CONFIG = {
  ru: {
    dayjsLocale: 'ru',
    localeText: {
      fieldDayPlaceholder: () => 'дд',
      fieldMonthPlaceholder: () => 'мм',
      fieldYearPlaceholder: () => 'гггг'
    }
  },
  ua: {
    dayjsLocale: 'uk', // dayjs використовує стандартний код 'uk' для української
    localeText: {
      fieldDayPlaceholder: () => 'дд',
      fieldMonthPlaceholder: () => 'мм',
      fieldYearPlaceholder: () => 'рррр'
    }
  }
};

/**
 * Отримати конфіг для DatePicker на основі мови i18n
 * @param {string} appLanguage - поточна мова приложення (ru, ua, тощо)
 * @returns {Object} об'єкт з dayjsLocale та localeText для LocalizationProvider
 */
export const getDatePickerConfig = (appLanguage) => {
  return (
    LANGUAGE_DATE_CONFIG[appLanguage] || LANGUAGE_DATE_CONFIG.ua
  );
};

/**
 * Експортувати всю конфігурацію для зовнішнього використання
 */
export default LANGUAGE_DATE_CONFIG;
