import { USER_LOGIN } from "../../API/baseApi";

import { vlbl } from "vlbl";
import {
    GET_ALL_USER,
    GET_USER_BY_PROJECT,
    GET_USER_SEARCH,
    SAVE_USER_LOGIN,
} from "../contants/jiraContant";

const initialState = {
    userLogin: JSON.parse(localStorage.getItem(USER_LOGIN)) || {},
    userSearch: [],
    users: [],
    userByProject: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SAVE_USER_LOGIN: {
            const copyState = vlbl.copy(state);
            copyState.userLogin = payload;
            return { ...state, userLogin: copyState.userLogin };
        }
        case GET_USER_SEARCH: {
            const copyState = vlbl.copy(state);
            copyState.userSearch = payload;
            return { ...state, userSearch: copyState.userSearch };
        }
        case GET_ALL_USER: {
            const copyState = vlbl.copy(state);
            copyState.users = payload;
            return { ...state, users: copyState.users };
        }
        case GET_USER_BY_PROJECT: {
            const copyState = vlbl.copy(state);
            copyState.userByProject = payload;
            return { ...state, userByProject: copyState.userByProject };
        }

        default:
            return state;
    }
};
