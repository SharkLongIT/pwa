import { useTranslation } from "react-i18next";

export const getGreetingByTime = () => {
    const { t } = useTranslation();
    const hour = new Date().getHours();
    if (hour < 12) return t("greeting.morning");
    if (hour < 18) return t("greeting.afternoon");
    return t("greeting.evening");
};
