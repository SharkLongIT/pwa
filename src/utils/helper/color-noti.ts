import { useTranslation } from "react-i18next";

const getNotiColor = (title: string, colors: any) => {
    switch (title) {
        case "ConfirmSuccess":
            return {
                dot: "#22C55E",
                border: "#22C55E",
                bg: "#ECFDF5",
            };
        case "Danger":
            return {
                dot: "#EF4444",
                border: "#EF4444",
                bg: "#FEF2F2",
            };
        default:
            return {
                dot: colors.primary,
                border: colors.primary,
                bg: colors.card,
            };
    }
};
export default getNotiColor;


