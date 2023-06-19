import { baseApi } from "./baseApi";

class TaskAPI extends baseApi {
    getAllTaskType = () => {
        return this.get(`/TaskType/getAll`);
    };
    createTask = (data) => {
        return this.post(data, `/Project/createTask`);
    };
    getOneTask = (id) => {
        return this.get(`/Project/getTaskDetail?taskId=${id}`);
    };
    updateStatusTask = (data) => {
        return this.put(data, `/Project/updateStatus`);
    };
    updateTask = (data) => {
        return this.post(data, `/Project/updateTask`);
    };
}

export const taskAPI = new TaskAPI();
