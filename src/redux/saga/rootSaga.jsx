import { all } from "redux-saga/effects";
import * as userJira from "./jira/userJiraSaga";
import * as projectCategory from "./jira/projectCategorySaga";
import * as projectSaga from "./jira/projectSaga";
import * as taskTypeSaga from "./jira/taskTypeSaga";
import * as prioritySaga from "./jira/prioritySaga";

export function* rootSaga() {
    yield all([
        userJira.theodoiSignin(),
        userJira.theodoiGetUserSearchSaga(),
        userJira.theodoiGetAllUserSaga(),
        projectCategory.theodoiProjectCategory(),
        projectSaga.theodoiCreateProject(),
        projectSaga.theodoiGetAllProjects(),
        projectSaga.theodoiUpdateProject(),
        projectSaga.theodoiDeleteProject(),
        projectSaga.theodoiAddUserProject(),
        projectSaga.theodoiDeleteUserProject(),
        projectSaga.theodoiGetOneProject(),
        taskTypeSaga.theodoiGetAllTaskType(),
        prioritySaga.theodoiGetAllPriority(),
    ]);
}
