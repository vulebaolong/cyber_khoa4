import { USER_LOGIN } from "../../API/baseApi";
import { GET_USER, SAVE_USER_LOGIN } from "../contants/jiraContant";

const initialState = {
    userLogin: JSON.parse(localStorage.getItem(USER_LOGIN)) || {},
    users: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SAVE_USER_LOGIN: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.userLogin = payload;
            return { ...state, userLogin: copyState.userLogin };
        }
        case GET_USER: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.users = payload;
            return { ...state, users: copyState.users };
        }
        default:
            return state;
    }
};
