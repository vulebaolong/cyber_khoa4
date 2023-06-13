import { GET_ALL_PROJECTS, INIT_PROJECT_EDIT } from "../contants/jiraContant";

const initialState = {
    projects: [],
    projectEdit: {},
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

        default:
            return state;
    }
};
