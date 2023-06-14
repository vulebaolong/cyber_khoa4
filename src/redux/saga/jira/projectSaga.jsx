import { call, delay, put, takeLatest } from "redux-saga/effects";
import { loading } from "../../../util/showHideLoading";
import {
    ADD_USER_PROJECT_API_SAGA,
    CREATE_PROJECT_API_SAGA,
    DELETE_PROJECT_API_SAGE,
    GET_ALL_PROJECTS,
    GET_ALL_PROJECTS_API_SAGA,
    HIDE_DRAWER,
    SHOW_NOTIFICATION,
    UPDATE_PROJECT_API_SAGE,
} from "../../contants/jiraContant";
import { STATE_CODE } from "../../../util/constant/statusCode";
import { projectApi } from "../../../API/projectApi";

// createProject
function* createProject({ type, payload }) {
    console.log("gửi lên", payload);

    loading.show();
    yield delay(1000);
    try {
        const { data, status } = yield call(() => projectApi.createProject(payload));
        console.log({ data, status });
        // yield put({
        //     type: CREATE_PROJECT,
        //     payload: data.content,
        // });
        // const { history } = yield select((state) => state.historyReducer);
        // history.push("/board");
    } catch (error) {
        console.log(error.response.data);
    }
    loading.hide();
}
export function* theodoiCreateProject() {
    yield takeLatest(CREATE_PROJECT_API_SAGA, createProject);
}

// getAllProjects
function* getAllProjects() {
    loading.show();
    try {
        const { data, status } = yield call(() => projectApi.getAllProjects());
        console.log({ data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: GET_ALL_PROJECTS,
            payload: data.content,
        });
    } catch (error) {
        console.log(error);
    }
    loading.hide();
}
export function* theodoiGetAllProjects() {
    yield takeLatest(GET_ALL_PROJECTS_API_SAGA, getAllProjects);
}

// updateProject
function* updateProject({ type, payload }) {
    loading.show();
    try {
        const { data, status } = yield call(() => projectApi.updateProject(payload));
        console.log({ data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        // getAllProjects Chạy hàm để render lại giao diện
        yield call(getAllProjects);

        // ẩn drawer right
        yield put({
            type: HIDE_DRAWER,
        });
    } catch (error) {
        console.log(error);
    }
    loading.hide();
}
export function* theodoiUpdateProject() {
    yield takeLatest(UPDATE_PROJECT_API_SAGE, updateProject);
}

// deleteProject
function* deleteProject({ type, payload }) {
    loading.show();
    try {
        const { data, status } = yield call(() => projectApi.deleteProject(payload));
        console.log({ data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);
        // yield delay(1000);
        loading.hide();
        yield put({
            type: SHOW_NOTIFICATION,
            payload: {
                type: "success",
                message: "Notification",
                description: "Successfully deleted",
                position: "bottom",
            },
        });
        // getAllProjects Chạy hàm để render lại giao diện
        yield call(getAllProjects);
    } catch (error) {
        console.log(error);
        loading.hide();
        yield put({
            type: SHOW_NOTIFICATION,
            payload: {
                type: "error",
                message: "Notification",
                description: "deleted failed",
                position: "bottom",
            },
        });
    }
}
export function* theodoiDeleteProject() {
    yield takeLatest(DELETE_PROJECT_API_SAGE, deleteProject);
}

//addUserProjectSaga
function* addUserProjectSaga({ type, payload }) {
    loading.show();
    try {
        console.log(payload);
        const { data, status } = yield call(() => projectApi.addUserProject(payload));
        console.log({ data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        loading.hide();
        yield put({
            type: SHOW_NOTIFICATION,
            payload: {
                type: "error",
                message: "Notification",
                description: "Add members failed",
                position: "bottom",
            },
        });
        // getAllProjects Chạy hàm để render lại giao diện
        yield call(getAllProjects);
    } catch (error) {
        console.log(error);
        loading.hide();
        yield put({
            type: SHOW_NOTIFICATION,
            payload: {
                type: "error",
                message: "Notification",
                description: "Successfully add member",
                position: "bottom",
            },
        });
    }
}
export function* theodoiAddUserProject() {
    yield takeLatest(ADD_USER_PROJECT_API_SAGA, addUserProjectSaga);
}
