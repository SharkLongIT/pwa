import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const getStatusColor = (status: number) => {
    switch (status) {
        case 1: return "#16A34A";
        case 2: return "#2563EB";
        case 3: return "#DC2626";
        default: return "#64748B";
    }
};
export { getStatusColor };

// const getText = (string: string, t?: any) => {
//     switch (string) {
//         case "draft": return t("project.statusOptions.draft");
//         case "active": return t("project.statusOptions.active");
//         case "completed": return t("project.statusOptions.completed");
//         default: return t("project.statusOptions.unknown");
//     }
// }
// export { getText };
// const getStatusText = (status: number, t?: any) => {
//     switch (status) {
//         case 0: return "Draft"; // t("project.statusOptions.draft");
//         case 1: return "Active"; // t("project.statusOptions.active");
//         case 2: return "Completed"; // t("project.statusOptions.completed");
//         default: return "Unknown"; // t("project.statusOptions.unknown");
//     }
// }
export const getStatusText = (status: number, t: TFunction) => {
    switch (status) {
        case 0:
            return t("project.statusOptions.draft");
        case 1:
            return t("project.statusOptions.active");
        case 2:
            return t("project.statusOptions.completed");
        default:
            return t("project.statusOptions.unknown");
    }
};