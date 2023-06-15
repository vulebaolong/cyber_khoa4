import { baseApi } from "./baseApi";

class PriorityApi extends baseApi {
    getAllPriority = () => {
        return this.get(`/Priority/getAll`);
    };
}

export const priorityApi = new PriorityApi();
