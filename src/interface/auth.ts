export interface ILoginPayload {
    userNameOrEmailAddress?: string;
    password?: string;
    rememberClient: boolean
}
export interface IUser {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    avatar?: string | null;
}
export interface IResponseLogin {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
    shouldResetPassword: boolean;
    passwordResetCode?: string | null;
    requiresTwoFactorVerification: boolean;
    twoFactorAuthProviders?: string[] | null;
    twoFactorRememberClientToken?: string | null;
    returnUrl?: string | null;
}

export interface UserInfo {
    id: number;
    name: string;
    emailAddress: string;
    surname: string;
    userName: string;
    userType: number
}

export interface TenantInfo {
    id: number;
    name: string;
    tenancyName: string
}
export interface CurrentLoginInfo {
    tenant: TenantInfo;
    user: UserInfo
}