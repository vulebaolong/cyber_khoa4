import { INIT_NOTIFICATION, SHOW_NOTIFICATION } from "../contants/jiraContant";

const initialState = {
    api: null,
};

export const notificationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case INIT_NOTIFICATION: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.api = payload;
            return { ...state, api: copyState.api };
        }

        case SHOW_NOTIFICATION: {
            const { message, description, type, position } = payload;
            // type: error || info || open ||success || warning ||destroy
            // position: top, topLeft, topRight, left, right, bottom, bottomLeft, bottomRight
            state.api[type]({
                message,
                description,
                placement: position,
            });
            return state;
        }

        default:
            return state;
    }
};
