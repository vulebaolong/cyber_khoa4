import { baseApi } from "./baseApi";

class TaskTypeApi extends baseApi {
    getAllTaskType = () => {
        return this.get(`/TaskType/getAll`);
    };
}

export const taskTypeApi = new TaskTypeApi();
