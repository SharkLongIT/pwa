import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import vi from "./locales/vi";
import en from "./locales/en";

(async () => {
    const lang = await AsyncStorage.getItem("LANG");

    i18n
        .use(initReactI18next)
        .init({
            resources: {
                vi: { translation: vi },
                en: { translation: en },
            },
            lng: lang || "vi",
            fallbackLng: "vi",
            interpolation: {
                escapeValue: false,
            },
        });
})();

export default i18n;
