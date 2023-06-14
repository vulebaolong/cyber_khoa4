import {
    ADD_USER_PROJECT_API_SAGA,
    CREATE_PROJECT_API_SAGA,
    DELETE_PROJECT_API_SAGE,
    GET_ALL_PROJECTS_API_SAGA,
    GET_USER_API_SAGA,
    INIT_NOTIFICATION,
    INIT_PROJECT_EDIT,
    PROJECT_CATEGORY_API_SAGA,
    UPDATE_PROJECT_API_SAGE,
    USER_SIGNIN_API_SAGA,
} from "../contants/jiraContant";

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

export const createProjectAction = (data) => {
    return {
        type: CREATE_PROJECT_API_SAGA,
        payload: data,
    };
};

export const getAllProjectsAction = (data) => {
    return {
        type: GET_ALL_PROJECTS_API_SAGA,
        payload: data,
    };
};

export const initProjectEditAction = (data) => {
    return {
        type: INIT_PROJECT_EDIT,
        payload: data,
    };
};

export const updateProjectAction = (data) => {
    return {
        type: UPDATE_PROJECT_API_SAGE,
        payload: data,
    };
};

export const deleteProjectAction = (data) => {
    return {
        type: DELETE_PROJECT_API_SAGE,
        payload: data,
    };
};

export const initNotificationAction = (data) => {
    return {
        type: INIT_NOTIFICATION,
        payload: data,
    };
};

export const getUserAction = (data) => {
    return {
        type: GET_USER_API_SAGA,
        payload: data,
    };
};

export const addUserProjectAction = (data) => {
    return {
        type: ADD_USER_PROJECT_API_SAGA,
        payload: data,
    };
};
