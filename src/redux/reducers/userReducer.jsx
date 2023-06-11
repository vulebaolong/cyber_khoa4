import { USER_LOGIN } from "../../services/jiraServices";
import { SAVE_USER_LOGIN } from "../contants/jiraContant";

const initialState = {
    userLogin: JSON.parse(localStorage.getItem(USER_LOGIN)) || {},
};

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SAVE_USER_LOGIN: {
            const copyState = JSON.parse(JSON.stringify(state));

            copyState.userLogin = payload;
            return copyState;
        }
        default:
            return state;
    }
};
