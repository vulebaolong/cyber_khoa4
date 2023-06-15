import { USER_LOGIN } from "../../API/baseApi";
import { GET_ALL_USER, GET_USER_SEARCH, SAVE_USER_LOGIN } from "../contants/jiraContant";

const initialState = {
    userLogin: JSON.parse(localStorage.getItem(USER_LOGIN)) || {},
    userSearch: [],
    users: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SAVE_USER_LOGIN: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.userLogin = payload;
            return { ...state, userLogin: copyState.userLogin };
        }
        case GET_USER_SEARCH: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.userSearch = payload;
            return { ...state, userSearch: copyState.userSearch };
        }
        case GET_ALL_USER: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.users = payload;
            return { ...state, users: copyState.users };
        }

        default:
            return state;
    }
};
