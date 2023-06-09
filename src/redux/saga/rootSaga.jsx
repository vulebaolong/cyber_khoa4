import { all } from "redux-saga/effects";
import * as userJira from "./jira/userJiraSaga";
import * as projectCategory from "./jira/projectCategorySaga";
import * as projectSaga from "./jira/projectSaga";
import * as prioritySaga from "./jira/prioritySaga";
import * as taskSaga from "./jira/taskSaga";
import * as statusSaga from "./jira/statusSaga";

export function* rootSaga() {
    yield all([
        userJira.theodoiSignin(),
        userJira.theodoiGetUserSearchSaga(),
        userJira.theodoiGetAllUserSaga(),
        userJira.theodoiGetUserByProjectId(),
        projectCategory.theodoiProjectCategory(),
        projectSaga.theodoiCreateProject(),
        projectSaga.theodoiGetAllProjects(),
        projectSaga.theodoiUpdateProject(),
        projectSaga.theodoiDeleteProject(),
        projectSaga.theodoiAddUserProject(),
        projectSaga.theodoiDeleteUserProject(),
        projectSaga.theodoiGetOneProject(),
        taskSaga.theodoiGetAllTaskType(),
        taskSaga.theodoiCreateTask(),
        taskSaga.theodoiGetOneTask(),
        taskSaga.theodoiUpdateStatusTask(),
        taskSaga.theodoiChangeAndUpdateApiTask(),
        prioritySaga.theodoiGetAllPriority(),
        statusSaga.theodoiGetAllStatus(),
    ]);
}
