// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { enTranslation } from "./Languages/en.js";
import { arTranslation } from "./Languages/ar.js";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
  },
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
