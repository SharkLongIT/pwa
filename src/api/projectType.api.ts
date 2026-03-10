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
    activateProject(projectId: number): Promise<any> {
        return apiClient.post(`/api/services/app/ProjectFe/ActivateProject?projectId=${projectId}`);
    },
    updateStatusProject(data: any): Promise<any> {
        return apiClient.put('/api/services/app/ProjectFe/UpdateStatusProject', data);
    },

    getProjectDetail(projectId: number): Promise<IAbpProjectTypeResponse<any>> {
        return apiClient.get(`/api/services/app/ProjectFe/GetProjectDetail?projectId=${projectId}`);
    },


    // ProjectType
    getAllProjectsTypePaging(data: { projectCode?: string, skipCount: number, maxResultCount: number }): Promise<IAbpProjectTypeResponse<ProjectType[]>> {
        return apiClient.get(`/api/services/app/ProjectFe/GetAllProjectsType`, { params: data });
    },
    getProjectTypes(): Promise<IAbpProjectTypeResponse<ProjectType[]>> {
        return apiClient.get('/api/services/app/ProjectFe/GetProjectTypes');
    },
    createProjectType(data: any): Promise<any> {
        return apiClient.post('/api/services/app/ProjectFe/CreateProjectType', data);
    },
    updateProjectType(data: any): Promise<any> {
        return apiClient.put('/api/services/app/ProjectFe/UpdateProjectType', data);
    },
    deleteProjectType(projectId: number): Promise<any> {
        return apiClient.delete(`/api/services/app/ProjectFe/DeleteProjectType?projectId=${projectId}`);
    },

    //Schedule 
    updateStatusSchedule(data: any): Promise<any> {
        return apiClient.put('/api/services/app/ProjectFe/UpdateStatusSchedule', data);
    },

};
export default projectFe;
