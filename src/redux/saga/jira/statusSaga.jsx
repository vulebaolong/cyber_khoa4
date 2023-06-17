import { loading } from "../../../util/showHideLoading";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATE_CODE } from "../../../util/constant/statusCode";
import { GET_ALL_STATUS, GET_ALL_STATUS_API_SAGA } from "../../contants/jiraContant";
import { statusApi } from "../../../API/statusApi";

// getAllStatus
function* getAllStatus({ type, payload }) {
    loading.show();
    try {
        const { data, status } = yield call(() => statusApi.getAllStatus());
        console.log("Saga - getAllStatus", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: GET_ALL_STATUS,
            payload: data.content,
        });
    } catch (error) {
        console.log(error);
    }
    loading.hide();
}
export function* theodoiGetAllStatus() {
    yield takeLatest(GET_ALL_STATUS_API_SAGA, getAllStatus);
}
