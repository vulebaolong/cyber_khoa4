import { combineReducers } from "redux";
import { jiraReducer } from "./jiraReducer";
export const rootReducer = combineReducers({ jiraReducer });
