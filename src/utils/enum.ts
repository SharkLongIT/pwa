export enum EnvironmentEnum {
    LOCAL = 'local',
    DEVELOPMENT = 'development',
    STAG = 'stag',
    PROD = 'prod',
}

export enum RolesEnum {
    ADMIN = 'ADMIN',
}

export enum StorageEnum {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
}

export enum LanguageEnum {
    EN = 'en',
}

export enum VerifyModeEnum {
    SIGN_UP = 'sign_up',
    FORGOT_PASSWORD = 'forgot_password',
}

export enum ProjectStatusEnum {
    Draft = 0,
    Active = 1,
    Completed = 2,
    // CANCELLED = 4,
}
export const STATUS_OPTIONS = [
    { labelKey: "project.statusOptions.all", value: undefined },
    { labelKey: "project.statusOptions.draft", value: 0 },
    { labelKey: "project.statusOptions.active", value: 1 },
    { labelKey: "project.statusOptions.completed", value: 2 },
];
export enum ProjectTypeEnum {
    INTERNAL = 'INTERNAL',
    EXTERNAL = 'EXTERNAL',
}

export const EVENT = {
    PROJECT_CREATED: 'PROJECT_CREATED',
};

const PAGE_SIZE = 10;
export const PAGINATION = {
    page: 1,
    pageSize: PAGE_SIZE,
    total: 0,
};