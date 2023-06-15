// https://casestudy.cyberlearn.vn/swagger/index.html

import axios from "axios";

const DOMAIN = "https://casestudy.cyberlearn.vn/api";
export const TOKEN = "access_token";
export const USER_LOGIN = "USER_LOGIN";

export class baseApi {
    put = (data, url) => {
        return axios({
            url: `${DOMAIN}${url}`,
            method: "PUT",
            data,
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
        });
    };
    get = (url) => {
        return axios({
            url: `${DOMAIN}${url}`,
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
        });
    };
    post = (data, url) => {
        return axios({
            url: `${DOMAIN}${url}`,
            method: "POST",
            data,
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
        });
    };
    delete = (url) => {
        return axios({
            url: `${DOMAIN}${url}`,
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
        });
    };
}
