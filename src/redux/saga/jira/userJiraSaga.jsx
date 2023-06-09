import axios from "axios";
import { takeLatest } from "redux-saga/effects";
import { USER_SIGNIN_API_SAGA } from "../../contants/jiraContant";
import { jiraApi } from "../../../services/jiraServices";

function* signinSaga({ type, payload }) {
    try {
        const { data, status } = yield jiraApi.signinJira(payload);
        console.log({ data, status });
    } catch (error) {
        console.log(error.response.data);
    }
}

export function* theodoiSignin() {
    yield takeLatest(USER_SIGNIN_API_SAGA, signinSaga);
}
