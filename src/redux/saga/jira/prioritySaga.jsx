import { loading } from "./../../../util/showHideLoading";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATE_CODE } from "./../../../util/constant/statusCode";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_API_SAGA } from "../../contants/jiraContant";
import { priorityApi } from "../../../API/priorityApi";

// getAllPriority
function* getAllPriority({ type, payload }) {
    loading.show();
    yield delay(1000);
    try {
        const { data, status } = yield call(() => priorityApi.getAllPriority());
        console.log("Saga - getAllPriority", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);
        yield put({
            type: GET_ALL_PRIORITY,
            payload: data.content,
        });
    } catch (error) {
        console.log(error);
    }
    loading.hide();
}
export function* theodoiGetAllPriority() {
    yield takeLatest(GET_ALL_PRIORITY_API_SAGA, getAllPriority);
}
