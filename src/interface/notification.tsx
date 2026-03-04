import { AxiosResponse } from "axios";

export interface INotificationPayload {
    userId: number;
    state?: string;
    skipCount?: number;
    maxResultCount?: number;
}

export interface INotification {
    id: string;
    title: string;
    content: string;
    time: string;
    state?: string;
}
export interface IAbpNotificationsResponse<T> {
    result: T;
    success: boolean;
    error: {
        code: number;
        message: string;
        details?: string;
    } | null;
    unAuthorizedRequest: boolean;
    __abp: boolean;
    data: any;
}
export interface INotificationResult {
    items: INotification[];
    totalCount: number;
    unreadCount: number;
}

export type NotificationResponse =
    AxiosResponse<IAbpNotificationsResponse<INotificationResult>>;