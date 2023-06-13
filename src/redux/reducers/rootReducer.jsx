import { combineReducers } from "redux";
import { jiraReducer } from "./jiraReducer";
import { userReducer } from "./userReducer";
import { projectCategoryReducer } from "./projectCategoryReducer";
import { projectReducer } from "./projectReducer";
import { drawerReducer } from "./drawerReducer";
import { loadingReducer } from "./loadingReducer";
export const rootReducer = combineReducers({
    jiraReducer,
    userReducer,
    projectCategoryReducer,
    projectReducer,
    drawerReducer,
    loadingReducer,
});
