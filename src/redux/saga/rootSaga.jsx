import { all } from "redux-saga/effects";
import * as userJira from "./jira/userJiraSaga";
import * as projectCategory from "./jira/projectCategorySaga";
import * as projectSaga from "./jira/projectSaga";

export function* rootSaga() {
    yield all([
        userJira.theodoiSignin(),
        userJira.theodoiGetUser(),
        projectCategory.theodoiProjectCategory(),
        projectSaga.theodoiCreateProject(),
        projectSaga.theodoiGetAllProjects(),
        projectSaga.theodoiUpdateProject(),
        projectSaga.theodoiDeleteProject(),
        projectSaga.theodoiAddUserProject(),
    ]);
}
