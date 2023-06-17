import { loading } from "../../../util/showHideLoading";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATE_CODE } from "../../../util/constant/statusCode";
import {
    CREATE_TASK_API_SAGA,
    GET_ALL_TASKTPYE_API_SAGA,
    GET_ALL_TASKTYPE,
    HIDE_DRAWER,
} from "../../contants/jiraContant";
import { taskAPI } from "../../../API/taskAPI";
import { projectApi } from "../../../API/projectApi";
import { history } from "../../../util/lib/history";

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

// createTask
function* createTask({ type, payload }) {
    console.log(payload);
    loading.show();
    try {
        const { data, status } = yield call(() => projectApi.createTask(payload));
        console.log("Saga - createTask", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: HIDE_DRAWER,
        });
        loading.hide();

        history.push(`/projectdetail/${payload.projectId}`);
    } catch (error) {
        console.log(error);
        loading.hide();
    }
}
export function* theodoicreateTask() {
    yield takeLatest(CREATE_TASK_API_SAGA, createTask);
}
