import { all } from "redux-saga/effects";
import * as userJira from "./jira/userJiraSaga";
import * as projectCategory from "./jira/projectCategorySaga";
import * as projectSaga from "./jira/projectSaga";

export function* rootSaga() {
    yield all([
        userJira.theodoiSignin(),
        projectCategory.theodoiProjectCategory(),
        projectSaga.theodoiCreateProject(),
        projectSaga.theodoiGetAllProjects(),
        projectSaga.theodoiUpdateProject(),
    ]);
}
