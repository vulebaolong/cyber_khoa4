import { loading } from "../../util/showHideLoading";

const initialState = {
    loading: false,
};

export const loadingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SHOW_LOADING": {
            loading.show();
            console.log("bật");
            return { ...state };
        }
        case "HIDE_LOADING": {
            loading.hide();
            console.log("tắt");
            return { ...state };
        }

        default:
            return state;
    }
};
