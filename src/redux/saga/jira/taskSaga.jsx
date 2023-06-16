import { loading } from "../../../util/showHideLoading";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATE_CODE } from "../../../util/constant/statusCode";
import {
    CREATE_TASK_API_SAGA,
    GET_ALL_TASKTPYE_API_SAGA,
    GET_ALL_TASKTYPE,
} from "../../contants/jiraContant";
import { taskAPI } from "../../../API/taskAPI";

// getAllTaskType
function* getAllTaskType({ type, payload }) {
    loading.show();
    yield delay(1000);
    try {
        const { data, status } = yield call(() => taskAPI.getAllTaskType());
        console.log("Saga - getAllTaskType", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: GET_ALL_TASKTYPE,
            payload: data.content,
        });
    } catch (error) {
        console.log(error);
    }
    loading.hide();
}
export function* theodoiGetAllTaskType() {
    yield takeLatest(GET_ALL_TASKTPYE_API_SAGA, getAllTaskType);
}

// getAllTaskType
function* createTask({ type, payload }) {
    loading.show();
    yield delay(1000);
    try {
        const { data, status } = yield call(() => taskAPI.getAllTaskType());
        console.log("Saga - getAllTaskType", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: GET_ALL_TASKTYPE,
            payload: data.content,
        });
    } catch (error) {
        console.log(error);
    }
    loading.hide();
}
export function* theodoicreateTask() {
    yield takeLatest(CREATE_TASK_API_SAGA, createTask);
}
