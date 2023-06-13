// https://casestudy.cyberlearn.vn/swagger/index.html
import axios from "axios";

const DOMAIN = "https://casestudy.cyberlearn.vn/api";
export const TOKEN = "access_token";
export const USER_LOGIN = "USER_LOGIN";

export const jiraApi = {
    signinJira: (userLogin) => {
        return axios({
            url: `${DOMAIN}/users/signin`,
            method: "POST",
            data: userLogin,
        });
    },
    getAllProjectCategory: () => {
        return axios({
            url: `${DOMAIN}/ProjectCategory`,
            method: "GET",
        });
    },
    createProject: (data) => {
        return axios({
            url: `${DOMAIN}/Project/createProjectAuthorize`,
            method: "POST",
            data,
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
        });
    },
    getAllProjects: () => {
        return axios({
            url: `${DOMAIN}/Project/getAllProject`,
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
        });
    },
    updateProject: (data) => {
        return axios({
            url: `${DOMAIN}/Project/updateProject?projectId=${data.id}`,
            method: "PUT",
            data,
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
        });
    },
};
