import { HIDE_LOADING, SHOW_LOADING } from "../contants/jiraContant";

const initialState = {
    isLoading: false,
};

export const loadingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_LOADING: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.isLoading = true;
            return copyState;
        }

        case HIDE_LOADING: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.isLoading = false;
            return copyState;
        }

        default:
            return state;
    }
};
