import { combineReducers } from "redux";
import { jiraReducer } from "./jiraReducer";
import { userReducer } from "./userReducer";
import { projectCategoryReducer } from "./projectCategoryReducer";
export const rootReducer = combineReducers({
    jiraReducer,
    userReducer,
    projectCategoryReducer,
});
