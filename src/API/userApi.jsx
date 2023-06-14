// https://casestudy.cyberlearn.vn/swagger/index.html
import { baseApi } from "./baseApi";

class UserApi extends baseApi {
    signinUser = (userLogin) => {
        return this.post(userLogin, `/users/signin`);
    };
    getUser = (value) => {
        return this.get(`/Users/getUser?keyword=${value}`);
    };
}

export const userApi = new UserApi();
