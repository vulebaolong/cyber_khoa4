import { baseApi } from "./baseApi";

class TaskAPI extends baseApi {
    getAllTaskType = () => {
        return this.get(`/TaskType/getAll`);
    };
}

export const taskAPI = new TaskAPI();
