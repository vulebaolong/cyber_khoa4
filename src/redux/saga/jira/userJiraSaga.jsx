import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
    GET_ALL_USER,
    GET_ALL_USER_API_SAGA,
    GET_USER_SEARCH,
    GET_USER_SEARCH_API_SAGA,
    SAVE_USER_LOGIN,
    USER_SIGNIN_API_SAGA,
} from "../../contants/jiraContant";
import { history } from "../../../util/lib/history";
import { loading } from "../../../util/showHideLoading";
import { STATE_CODE } from "../../../util/constant/statusCode";
import { userApi } from "../../../API/userApi";
import { TOKEN, USER_LOGIN } from "../../../API/baseApi";

// signinUserSaga
function* signinUserSaga({ type, payload }) {
    const { values } = payload;
    loading.show();
    yield delay(1000);
    try {
        const { data, status } = yield call(() => userApi.signinUser(values));
        console.log("Saga - signinUserSaga", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        // lưu vào localstore
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        yield put({
            type: SAVE_USER_LOGIN,
            payload: data.content,
        });

        // const { history } = yield select((state) => state.historyReducer);
        history.push("/projectcreate");
    } catch (error) {
        console.log(error);
    }
    loading.hide();
}
export function* theodoiSignin() {
    yield takeLatest(USER_SIGNIN_API_SAGA, signinUserSaga);
}

//getUserSaga
function* getUserSearchSaga({ type, payload }) {
    try {
        const { data, status } = yield call(() => userApi.getUserSearch(payload));
        console.log("Saga - getUserSearchSaga", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: GET_USER_SEARCH,
            payload: data.content,
        });
    } catch (error) {
        console.log(error);
    }
}
export function* theodoiGetUserSearchSaga() {
    yield takeLatest(GET_USER_SEARCH_API_SAGA, getUserSearchSaga);
}

//getAllUserSaga
function* getAllUserSaga({ type, payload }) {
    try {
        const { data, status } = yield call(() => userApi.getAllUser());
        console.log("Saga - getAllUserSaga", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: GET_ALL_USER,
            payload: data.content,
        });
    } catch (error) {
        console.log(error);
    }
}
export function* theodoiGetAllUserSaga() {
    yield takeLatest(GET_ALL_USER_API_SAGA, getAllUserSaga);
}
