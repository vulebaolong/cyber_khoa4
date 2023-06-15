import { GET_ALL_PRIORITY } from "../contants/jiraContant";

const initialState = {
    priority: [],
};

export const priorityReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_PRIORITY: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.priority = payload;
            return { ...state, priority: copyState.priority };
        }

        default:
            return state;
    }
};
