import { combineReducers } from "redux";
import { jiraReducer } from "./jiraReducer";
import { loadingReducer } from "./loadingReducer";
import { userReducer } from "./userReducer";
export const rootReducer = combineReducers({
    jiraReducer,
    loadingReducer,
    userReducer,
});
