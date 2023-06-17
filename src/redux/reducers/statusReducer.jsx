import { GET_ALL_STATUS } from "../contants/jiraContant";

const initialState = {
    status: [],
};

export const statusReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_STATUS: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.status = payload;
            return { ...state, status: copyState.status };
        }

        default:
            return state;
    }
};
