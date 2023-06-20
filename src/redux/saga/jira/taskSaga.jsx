import { loading } from "../../../util/showHideLoading";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { STATE_CODE } from "../../../util/constant/statusCode";
import {
    CHANGE_AND_UPDATEAPI_TASK,
    CHANGE_ASSIGNEES,
    CHANGE_TASK,
    COMPONENT_CONTENT_MODAL,
    CREATE_TASK_API_SAGA,
    GET_ALL_TASKTPYE_API_SAGA,
    GET_ALL_TASKTYPE,
    GET_ONE_PROJECT_API_SAGA,
    GET_ONE_TASK,
    GET_ONE_TASK_API_SAGA,
    HIDE_DRAWER,
    UPDATE_STATUS_API_SAGA,
    UPDATE_TASK_API_SAGA,
} from "../../contants/jiraContant";
import { taskAPI } from "../../../API/taskAPI";
import { history } from "../../../util/lib/history";
import ContentProjectDetailModal from "../../../components/Jira/ProjectDetail/ContentProjectDetailModal";

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
        const { data, status } = yield call(() => taskAPI.createTask(payload));
        console.log("Saga - createTask", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);
        yield put({
            type: GET_ONE_PROJECT_API_SAGA,
            payload: data.content.projectId,
            isLoading: false,
        });
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
export function* theodoiCreateTask() {
    yield takeLatest(CREATE_TASK_API_SAGA, createTask);
}

// getOneTask
function* getOneTask({ type, payload }) {
    console.log(payload);
    loading.show();
    try {
        const { data, status } = yield call(() => taskAPI.getOneTask(payload));
        console.log("Saga - getOneTask", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: GET_ONE_TASK,
            payload: data.content,
        });
        yield put({
            type: COMPONENT_CONTENT_MODAL,
            payload: <ContentProjectDetailModal />,
        });
        loading.hide();
    } catch (error) {
        console.log(error);
        loading.hide();
    }
}
export function* theodoiGetOneTask() {
    yield takeLatest(GET_ONE_TASK_API_SAGA, getOneTask);
}

// updateStatusTask
function* updateStatusTask({ type, payload }) {
    // loading.show();
    const { taskId, statusId, projectId } = payload;
    try {
        const { data, status } = yield call(() =>
            taskAPI.updateStatusTask({
                taskId,
                statusId,
            })
        );
        console.log("Saga - updateStatusTask", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: GET_ONE_PROJECT_API_SAGA,
            payload: projectId,
            isLoading: false,
        });
        // loading.hide();
    } catch (error) {
        console.log(error);
        loading.hide();
    }
}
export function* theodoiUpdateStatusTask() {
    yield takeLatest(UPDATE_STATUS_API_SAGA, updateStatusTask);
}

// updateStatusTask
function* updateTask({ type, payload }) {
    loading.show();
    try {
        const { data, status } = yield call(() => taskAPI.updateTask(payload));
        console.log("Saga - updateTask", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        // yield put({
        //     type: GET_ONE_PROJECT_API_SAGA,
        //     payload: projectId,
        //     isLoading: false,
        // });
        loading.hide();
    } catch (error) {
        console.log(error);
        loading.hide();
    }
}
export function* theodoiUpdateTask() {
    yield takeLatest(UPDATE_TASK_API_SAGA, updateTask);
}

// changeAndUpdateApiTask
function* changeAndUpdateApiTask({ type, payload }) {
    console.log(payload);
    try {
        // thay đổi dữ liệu saga
        switch (payload.type) {
            case CHANGE_ASSIGNEES:
                yield put({
                    type: CHANGE_ASSIGNEES,
                    payload,
                });
                break;

            default:
                yield put({
                    type: CHANGE_TASK,
                    payload,
                });
                break;
        }

        //lấy state task
        let { task } = yield select((state) => state.taskReducer);
        const listUserAsign = task.assigness.map((user) => {
            return user.id;
        });
        task = {
            ...task,
            listUserAsign,
        };

        //cập nhật api
        const { data, status } = yield call(() => taskAPI.updateTask(task));
        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);
        console.log("Saga - changeAndUpdateApiTask", { data, status });

        yield put({
            type: GET_ONE_PROJECT_API_SAGA,
            payload: task.projectId,
            isLoading: false,
        });
    } catch (error) {
        console.log(error);
    }
}
export function* theodoiChangeAndUpdateApiTask() {
    yield takeLatest(CHANGE_AND_UPDATEAPI_TASK, changeAndUpdateApiTask);
}
