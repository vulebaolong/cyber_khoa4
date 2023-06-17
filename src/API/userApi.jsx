// https://casestudy.cyberlearn.vn/swagger/index.html
import { baseApi } from "./baseApi";

class UserApi extends baseApi {
    signinUser = (userLogin) => {
        return this.post(userLogin, `/users/signin`);
    };
    getUserSearch = (value) => {
        return this.get(`/Users/getUser?keyword=${value}`);
    };
    getAllUser = () => {
        return this.get(`/Users/getUser`);
    };

    getUserByProjectId = (id) => {
        return this.get(`/Users/getUserByProjectId?idProject=${id}`);
    };
}

export const userApi = new UserApi();
