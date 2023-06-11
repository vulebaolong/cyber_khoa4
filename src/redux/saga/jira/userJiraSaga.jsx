import { call, put, takeLatest } from "redux-saga/effects";
import {
    HIDE_LOADING,
    SAVE_USER_LOGIN,
    SHOW_LOADING,
    USER_SIGNIN_API_SAGA,
} from "../../contants/jiraContant";
import { TOKEN, USER_LOGIN, jiraApi } from "../../../services/jiraServices";
import { history } from "../../../util/lib/history";

function* signinSaga({ type, payload }) {
    const { values } = payload;
    yield put({
        type: SHOW_LOADING,
    });
    try {
        const { data, status } = yield call(() => jiraApi.signinJira(values));
        console.log({ data, status });

        // lưu vào localstore
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        yield put({
            type: SAVE_USER_LOGIN,
            payload: data.content,
        });

        // const { history } = yield select((state) => state.historyReducer);
        // console.log(history);
        history.push("/jira");
    } catch (error) {
        console.log(error.response.data);
    }
    yield put({
        type: HIDE_LOADING,
    });
}

export function* theodoiSignin() {
    yield takeLatest(USER_SIGNIN_API_SAGA, signinSaga);
}
