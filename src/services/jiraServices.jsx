import axios from "axios";

const DOMAIN = "https://casestudy.cyberlearn.vn/api";

export const jiraApi = {
    signinJira: (userLogin) => {
        return axios({
            url: `${DOMAIN}/users/signin`,
            method: "POST",
            data: userLogin,
        });
    },
};
