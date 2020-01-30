import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common from "./public/static/locales/en/common.json";
import create_waste from "./public/static/locales/en/create_waste.json";
import index from "./public/static/locales/en/index.json";

const resources = {
  en: {
    common,
    create_waste,
    index,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
