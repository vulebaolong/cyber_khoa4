import { combineReducers } from "redux";
import { jiraReducer } from "./jiraReducer";
import { userReducer } from "./userReducer";
import { projectCategoryReducer } from "./projectCategoryReducer";
import { projectReducer } from "./projectReducer";
import { drawerReducer } from "./drawerReducer";
import { loadingReducer } from "./loadingReducer";
import { notificationReducer } from "./notificationReducer";
import { taskTypeReducer } from "./taskTypeReducer";
import { priorityReducer } from "./priorityReducer";
import { statusReducer } from "./statusReducer";
import { taskReducer } from "./taskReducer";
import { modalReducer } from "./modalReducer";
export const rootReducer = combineReducers({
    jiraReducer,
    userReducer,
    projectCategoryReducer,
    projectReducer,
    drawerReducer,
    loadingReducer,
    notificationReducer,
    taskTypeReducer,
    priorityReducer,
    statusReducer,
    taskReducer,
    modalReducer,
});
