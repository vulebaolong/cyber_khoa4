import {
    ADD_USER_PROJECT_API_SAGA,
    CHANGE_ASSIGNEES,
    CHANGE_TASK,
    COMPONENT_CONTENT_MODAL,
    CREATE_PROJECT_API_SAGA,
    CREATE_TASK_API_SAGA,
    DELETE_PROJECT_API_SAGE,
    DELETE_USER_PROJECT_API_SAGA,
    GET_ALL_PRIORITY_API_SAGA,
    GET_ALL_PROJECTS_API_SAGA,
    GET_ALL_STATUS_API_SAGA,
    GET_ALL_TASKTPYE_API_SAGA,
    GET_ALL_USER_API_SAGA,
    GET_ONE_PROJECT_API_SAGA,
    GET_ONE_TASK_API_SAGA,
    GET_USER_BY_PROJECT_API_SAGA,
    GET_USER_SEARCH_API_SAGA,
    INIT_NOTIFICATION,
    INIT_PROJECT_EDIT,
    PROJECT_CATEGORY_API_SAGA,
    UPDATE_PROJECT_API_SAGE,
    UPDATE_STATUS_API_SAGA,
    UPDATE_TASK_API_SAGA,
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

export const getUserSearchAction = (data) => {
    return {
        type: GET_USER_SEARCH_API_SAGA,
        payload: data,
    };
};

export const addUserProjectAction = (data) => {
    return {
        type: ADD_USER_PROJECT_API_SAGA,
        payload: data,
    };
};

export const deleteUserProjectAction = (data) => {
    return {
        type: DELETE_USER_PROJECT_API_SAGA,
        payload: data,
    };
};

export const getOneProjectAction = (data) => {
    return {
        type: GET_ONE_PROJECT_API_SAGA,
        payload: data,
    };
};

export const getAllTaskTypeAction = (data) => {
    return {
        type: GET_ALL_TASKTPYE_API_SAGA,
        payload: data,
    };
};

export const getPriorityAction = (data) => {
    return {
        type: GET_ALL_PRIORITY_API_SAGA,
        payload: data,
    };
};

export const getAllUserAction = (data) => {
    return {
        type: GET_ALL_USER_API_SAGA,
        payload: data,
    };
};

export const createTaskAction = (data) => {
    return {
        type: CREATE_TASK_API_SAGA,
        payload: data,
    };
};

export const getAllStatusAction = (data) => {
    return {
        type: GET_ALL_STATUS_API_SAGA,
        payload: data,
    };
};

export const getUserByProjectIdAction = (data) => {
    return {
        type: GET_USER_BY_PROJECT_API_SAGA,
        payload: data,
    };
};

export const componentContenModalAction = (data) => {
    return {
        type: COMPONENT_CONTENT_MODAL,
        payload: data,
    };
};

export const getOneTaskAction = (data) => {
    return {
        type: GET_ONE_TASK_API_SAGA,
        payload: data,
    };
};

export const updateStatusTaskAction = (data) => {
    return {
        type: UPDATE_STATUS_API_SAGA,
        payload: data,
    };
};

export const changeTaskAction = (data) => {
    return {
        type: CHANGE_TASK,
        payload: data,
    };
};

export const changeAssigneesAction = (data) => {
    return {
        type: CHANGE_ASSIGNEES,
        payload: data,
    };
};

export const updateTaskAction = (data) => {
    return {
        type: UPDATE_TASK_API_SAGA,
        payload: data,
    };
};
