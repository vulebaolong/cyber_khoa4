import { PROJECT_CATEGORY_API_SAGA, USER_SIGNIN_API_SAGA } from "../contants/jiraContant";

export const userSigninAction = (data) => {
    return {
        type: USER_SIGNIN_API_SAGA,
        payload: data,
    };
};

export const projectCategoryAction = (data) => {
    return {
        type: PROJECT_CATEGORY_API_SAGA,
        payload: data,
    };
};
