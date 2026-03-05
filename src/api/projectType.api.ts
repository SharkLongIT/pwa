import { IAbpProjectTypeResponse, ProjectType } from "~/interface/project";
import apiClient from "./apiClient";
import { create } from "react-test-renderer";

const projectFe = {
    getAllProjectsByUserId(data: { status?: number, keyword?: string, skipCount: number, maxResultCount: number }): Promise<IAbpProjectTypeResponse<ProjectType[]>> {
        return apiClient.get(`/api/services/app/ProjectFe/GetAllProjectsByUserId`, { params: data });
    },
    getProjectById(id: number): Promise<IAbpProjectTypeResponse<ProjectType>> {
        return apiClient.get(`/api/services/app/ProjectFe/GetProject?projectId=${id}`);
    },
    createProject(data: any): Promise<any> {
        return apiClient.post('/api/services/app/ProjectFe/CreateProject', data);
    },
    updateProject(data: any): Promise<any> {
        return apiClient.put('/api/services/app/ProjectFe/UpdateProject', data);
    },
    deleteProject(id: number): Promise<any> {
        return apiClient.delete(`/api/services/app/ProjectFe/DeleteProject?projectId=${id}`);
    },

    getProjectTypes(): Promise<IAbpProjectTypeResponse<ProjectType[]>> {
        return apiClient.get('/api/services/app/ProjectFe/GetProjectTypes');
    },

    activateProject(projectId: number): Promise<any> {
        return apiClient.post(`/api/services/app/ProjectFe/ActivateProject?projectId=${projectId}`);
    },

    getProjectDetail(projectId: number): Promise<IAbpProjectTypeResponse<any>> {
        return apiClient.get(`/api/services/app/ProjectFe/GetProjectDetail?projectId=${projectId}`);
    }
};
export default projectFe;
