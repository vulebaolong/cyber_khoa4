import { HIDE_DRAWER, SEND_HANDLE_SUBMIT, SHOW_DRAWER } from "../contants/jiraContant";

const initialState = {
    open: false,
    title: "",
    ComponentDrawer: null,
    handleSubmit: () => {
        console.log(123);
    },
};

export const drawerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_DRAWER: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.open = true;
            copyState.title = payload.title;
            copyState.ComponentDrawer = payload.ComponentDrawer;
            return {
                ...state,
                open: copyState.open,
                title: copyState.title,
                ComponentDrawer: copyState.ComponentDrawer,
            };
        }
        case HIDE_DRAWER: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.open = false;
            return { ...state, open: copyState.open };
        }

        case SEND_HANDLE_SUBMIT: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.handleSubmit = payload;
            return { ...state, handleSubmit: copyState.handleSubmit };
        }

        default:
            return state;
    }
};
