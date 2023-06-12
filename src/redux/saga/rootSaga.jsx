import { all } from "redux-saga/effects";
import * as userJira from "./jira/userJiraSaga";
import * as projectCategory from "./jira/projectCategorySaga";

export function* rootSaga() {
    yield all([userJira.theodoiSignin(), projectCategory.theodoiProjectCategory()]);
}
