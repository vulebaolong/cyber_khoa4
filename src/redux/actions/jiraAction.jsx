import { USER_SIGNIN_API_SAGA } from "../contants/jiraContant";

export const userSigninAction = (data) => {
    return {
        type: USER_SIGNIN_API_SAGA,
        payload: data,
    };
};
