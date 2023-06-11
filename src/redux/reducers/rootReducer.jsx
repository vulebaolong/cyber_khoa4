import { combineReducers } from "redux";
import { jiraReducer } from "./jiraReducer";
import { userReducer } from "./userReducer";
export const rootReducer = combineReducers({
    jiraReducer,
    userReducer,
});
