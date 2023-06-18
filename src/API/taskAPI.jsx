import { baseApi } from "./baseApi";

class TaskAPI extends baseApi {
    getAllTaskType = () => {
        return this.get(`/TaskType/getAll`);
    };
    createTask = (data) => {
        return this.post(data, `/Project/createTask`);
    };
}

export const taskAPI = new TaskAPI();
