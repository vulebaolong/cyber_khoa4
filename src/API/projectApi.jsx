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

    getOneProject = (id) => {
        return this.get(`/Project/getProjectDetail?id=${id}`);
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

    deleteUserProject = (data) => {
        return this.post(data, `/Project/removeUserFromProject`);
    };
}

export const projectApi = new ProjectApi();
