import { call, delay, put, takeLatest } from "redux-saga/effects";
import { loading } from "../../../util/showHideLoading";
import { jiraApi } from "../../../services/jiraServices";
import {
    CREATE_PROJECT_API_SAGA,
    GET_ALL_PROJECTS,
    GET_ALL_PROJECTS_API_SAGA,
    HIDE_DRAWER,
    UPDATE_PROJECT_API_SAGE,
} from "../../contants/jiraContant";
import { STATE_CODE } from "../../../util/constant/statusCode";
import { hideDrawerAction } from "../../actions/drawerAction";

// createProject
function* createProject({ type, payload }) {
    console.log("gửi lên", payload);

    loading.show();
    yield delay(1000);
    try {
        const { data, status } = yield call(() => jiraApi.createProject(payload));
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
        const { data, status } = yield call(() => jiraApi.getAllProjects());
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
        const { data, status } = yield call(() => jiraApi.updateProject(payload));
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
