import { baseApi } from "./baseApi";

class ProjectApi extends baseApi {
    getAllProjectCategory = () => {
        return this.get(`/ProjectCategory`);
    };

    createProject = (data) => {
        return this.post(data, `/Project/createProjectAuthorize`);
    };

    getAllProjects = () => {
        return this.get(`/Project/getAllProject`);
    };

    updateProject = (data) => {
        return this.put(data, `/Project/updateProject?projectId=${data.id}`);
    };

    deleteProject = (id) => {
        return this.delete(`/Project/deleteProject?projectId=${id}`);
    };

    addUserProject = (data) => {
        return this.post(data, `/Project/assignUserProject`);
    };
}

export const projectApi = new ProjectApi();
