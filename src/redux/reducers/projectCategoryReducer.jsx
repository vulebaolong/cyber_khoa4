import { PROJECT_CATEGORY } from "../contants/jiraContant";

const initialState = {
    projectCategory: [],
};

export const projectCategoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PROJECT_CATEGORY: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.projectCategory = payload;
            return { ...state, projectCategory: copyState.projectCategory };
        }

        default:
            return state;
    }
};
