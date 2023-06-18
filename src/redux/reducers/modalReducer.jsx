import { COMPONENT_CONTENT_MODAL } from "../contants/jiraContant";
import { vlbl } from "vlbl";

const initialState = {
    ComponentContentModal: null,
    handleSubmit: () => {
        console.log("handleSubmit");
    },
};

export const modalReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case COMPONENT_CONTENT_MODAL: {
            const copyState = vlbl.copy(state);
            copyState.ComponentContentModal = payload;
            return { ...state, ComponentContentModal: copyState.ComponentContentModal };
        }

        default:
            return state;
    }
};
