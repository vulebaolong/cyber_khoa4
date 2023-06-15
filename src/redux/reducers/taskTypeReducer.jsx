import { GET_ALL_TASKTYPE } from "../contants/jiraContant";

const initialState = {
    taskType: [],
};

export const taskTypeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_TASKTYPE: {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.taskType = payload;
            return { ...state, taskType: copyState.taskType };
        }

        default:
            return state;
    }
};
