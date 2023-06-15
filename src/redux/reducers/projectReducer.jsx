import {
    GET_ALL_PROJECTS,
    INIT_PROJECT_EDIT,
    PUT_PROJECT_DETAIL,
} from "../contants/jiraContant";

const initialState = {
    projects: [],
    projectEdit: {},
    projectDetail: {},
};

export const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_PROJECTS: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.projects = payload;
            return { ...state, projects: copyState.projects };
        }

        case INIT_PROJECT_EDIT: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.projectEdit = payload;
            return { ...state, projectEdit: copyState.projectEdit };
        }

        case PUT_PROJECT_DETAIL: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.projectDetail = payload;
            return { ...state, projectDetail: copyState.projectDetail };
        }

        default:
            return state;
    }
};
