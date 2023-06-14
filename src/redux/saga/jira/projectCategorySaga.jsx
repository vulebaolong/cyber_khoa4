import { call, put, takeLatest } from "redux-saga/effects";
import { PROJECT_CATEGORY, PROJECT_CATEGORY_API_SAGA } from "../../contants/jiraContant";
import { loading } from "../../../util/showHideLoading";
import { STATE_CODE } from "../../../util/constant/statusCode";
import { projectApi } from "../../../API/projectApi";

function* projectCategorSaga({ type, payload }) {
    loading.show();
    try {
        const { data, status } = yield call(() => projectApi.getAllProjectCategory());
        // console.log({ data, status });
        if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);

        yield put({
            type: PROJECT_CATEGORY,
            payload: data.content,
        });
    } catch (error) {
        console.log(error);
    }
    loading.hide();
}

export function* theodoiProjectCategory() {
    yield takeLatest(PROJECT_CATEGORY_API_SAGA, projectCategorSaga);
}
