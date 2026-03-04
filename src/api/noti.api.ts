import { IAbpNotificationsResponse, INotificationPayload, INotificationResult } from "~/interface/notification";
import apiClient from "./apiClient";

const notiApi = {

    getNotifications(data: INotificationPayload): Promise<IAbpNotificationsResponse<INotificationResult>> {
        return apiClient.get('/api/services/app/Notification/GetUserNotifications', { params: data });
    },
};
export default notiApi;
