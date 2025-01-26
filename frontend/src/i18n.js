import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationAM from "./locales/am/translation.json";
import translationTI from "./locales/ti/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      am: { translation: translationAM },
      ti: { translation: translationTI }
    },
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false // react already protects from XSS
    }
  });

export default i18n;
