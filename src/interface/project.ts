import { AxiosResponse } from "axios";


export interface ProjectType {
    id: number;
    code: string;
    costRate: string;
    profitRate: string;
    marginRate: string;
    feedbackRate: string;
}

export interface IAbpProjectTypeResponse<T> {
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

export type ProjectTypeResponse =
    AxiosResponse<IAbpProjectTypeResponse<ProjectType[]>>;

export interface IProjectTypeResult {
    items: ProjectType[];
    totalCount: number;
}