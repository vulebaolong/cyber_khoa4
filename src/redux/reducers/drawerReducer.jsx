import {
    HIDE_DRAWER,
    SEND_HANDLE_SUBMIT,
    SHOW_DRAWER,
    SHOW_EDIT_DRAWER,
} from "../contants/jiraContant";

const initialState = {
    open: false,
    ContentComponentDrawer: (props) => {
        return <p>ContentComponentDrawer</p>;
    },
    handleSubmit: () => {
        console.log(123);
    },
};

export const drawerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_DRAWER: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.open = true;
            return { ...state, open: copyState.open };
        }
        case HIDE_DRAWER: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.open = false;
            return { ...state, open: copyState.open };
        }
        case SHOW_EDIT_DRAWER: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.open = true;
            copyState.ContentComponentDrawer = payload;
            return {
                ...state,
                open: copyState.open,
                ContentComponentDrawer: copyState.ContentComponentDrawer,
            };
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
