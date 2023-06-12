import { call, delay, put, takeLatest } from "redux-saga/effects";
import { SAVE_USER_LOGIN, USER_SIGNIN_API_SAGA } from "../../contants/jiraContant";
import { TOKEN, USER_LOGIN, jiraApi } from "../../../services/jiraServices";
import { history } from "../../../util/lib/history";
import { loading } from "../../../util/showHideLoading";
import { STATE_CODE } from "../../../util/constant/statusCode";

function* signinSaga({ type, payload }) {
    const { values } = payload;
    loading.show();
    yield delay(1000);
    try {
        const { data, status } = yield call(() => jiraApi.signinJira(values));
        // console.log({ data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        // lưu vào localstore
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        yield put({
            type: SAVE_USER_LOGIN,
            payload: data.content,
        });

        // const { history } = yield select((state) => state.historyReducer);
        history.push("/board");
    } catch (error) {
        console.log(error.response.data);
    }
    loading.hide();
}

export function* theodoiSignin() {
    yield takeLatest(USER_SIGNIN_API_SAGA, signinSaga);
}
