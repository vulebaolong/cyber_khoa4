import { call, delay, put, takeLatest } from "redux-saga/effects";
import { loading } from "../../../util/showHideLoading";
import {
    ADD_USER_PROJECT_API_SAGA,
    CREATE_PROJECT_API_SAGA,
    DELETE_PROJECT_API_SAGE,
    DELETE_USER_PROJECT_API_SAGA,
    GET_ALL_PROJECTS,
    GET_ALL_PROJECTS_API_SAGA,
    GET_ONE_PROJECT_API_SAGA,
    HIDE_DRAWER,
    PUT_PROJECT_DETAIL,
    SHOW_NOTIFICATION,
    UPDATE_PROJECT_API_SAGE,
} from "../../contants/jiraContant";
import { STATE_CODE } from "../../../util/constant/statusCode";
import { projectApi } from "../../../API/projectApi";
import { history } from "../../../util/lib/history";

// createProject
function* createProject({ type, payload }) {
    console.log("gửi lên", payload);

    loading.show();
    yield delay(1000);
    try {
        const { data, status } = yield call(() => projectApi.createProject(payload));
        console.log("Saga - createProject", { data, status });

        history.push("/projectmanager");
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
        console.log("Saga - getAllProjects", { data, status });

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
        console.log("Saga - updateProject", { data, status });

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
        console.log("Saga - deleteProject", { data, status });

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
                description: "Deleted failed",
                position: "bottom",
            },
        });
    }
}
export function* theodoiDeleteProject() {
    yield takeLatest(DELETE_PROJECT_API_SAGE, deleteProject);
}

//addUserProject
function* addUserProject({ type, payload }) {
    loading.show();
    try {
        console.log(payload);
        const { data, status } = yield call(() => projectApi.addUserProject(payload));
        console.log("Saga - addUserProject", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        loading.hide();
        yield put({
            type: SHOW_NOTIFICATION,
            payload: {
                type: "success",
                message: "Notification",
                description: "Successfully Add members Successfully",
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
                description: "Add members failed",
                position: "bottom",
            },
        });
    }
}
export function* theodoiAddUserProject() {
    yield takeLatest(ADD_USER_PROJECT_API_SAGA, addUserProject);
}

//deleteUserProject
function* deleteUserProject({ type, payload }) {
    loading.show();
    try {
        console.log(payload);
        const { data, status } = yield call(() => projectApi.deleteUserProject(payload));
        console.log("Saga - deleteUserProject", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        loading.hide();
        yield put({
            type: SHOW_NOTIFICATION,
            payload: {
                type: "success",
                message: "Notification",
                description: "Successfully delete members Successfully",
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
                description: "Delete members failed",
                position: "bottom",
            },
        });
    }
}
export function* theodoiDeleteUserProject() {
    yield takeLatest(DELETE_USER_PROJECT_API_SAGA, deleteUserProject);
}

//deleteUserProjectSaga
function* getOneProject({ type, payload }) {
    loading.show();
    try {
        console.log(payload);
        const { data, status } = yield call(() => projectApi.getOneProject(payload));
        console.log("Saga - getOneProject", { data, status });

        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: PUT_PROJECT_DETAIL,
            payload: data.content,
        });

        loading.hide();
    } catch (error) {
        console.log(error);
        loading.hide();
        yield put({
            type: SHOW_NOTIFICATION,
            payload: {
                type: "error",
                message: "Notification",
                description: "Delete members failed",
                position: "bottom",
            },
        });
        history.push("/projectmanager");
    }
}
export function* theodoiGetOneProject() {
    yield takeLatest(GET_ONE_PROJECT_API_SAGA, getOneProject);
}
