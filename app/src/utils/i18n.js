import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "../language/RU_ru.json";
import ua from "../language/UA_ua.json";


const resources = {
  ru: {
    translation: ru.data
  },
  ua: {
    translation: ua.data
  }
};

// Получаем язык из localStorage
const savedLanguage = localStorage.getItem("appLanguage");

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage || "ua", // по умолчанию ua
    fallbackLng: "ua",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;