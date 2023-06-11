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
};
