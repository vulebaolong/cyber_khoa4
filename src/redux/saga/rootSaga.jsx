import { all } from "redux-saga/effects";
import * as userJira from "./jira/userJiraSaga";

export function* rootSaga() {
    yield all([userJira.theodoiSignin()]);
}
