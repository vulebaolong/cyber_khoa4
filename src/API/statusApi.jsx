import { baseApi } from "./baseApi";

class StatusApi extends baseApi {
    getAllStatus = () => {
        return this.get(`/Status/getAll`);
    };
}

export const statusApi = new StatusApi();
