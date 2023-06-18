import { vlbl } from "vlbl";
import { GET_ALL_STATUS, GET_ONE_TASK } from "../contants/jiraContant";

const initialState = {
    task: {
        priorityTask: {
            priorityId: 1,
            priority: "High",
        },
        taskTypeDetail: {
            id: 1,
            taskType: "bug",
        },
        assigness: [
            {
                id: 5214,
                avatar: "https://ui-avatars.com/api/?name=Vũ Lê Bảo Long",
                name: "Vũ Lê Bảo Long",
                alias: "vu-le-bao-long",
            },
            {
                id: 5227,
                avatar: "https://ui-avatars.com/api/?name=admin",
                name: "admin",
                alias: "admin",
            },
        ],
        lstComment: [],
        taskId: 10133,
        taskName: "Đây là task high",
        alias: "day-la-task-high",
        description: "<p>oke chiến đi n&agrave; c&aacute;c huynh đ&agrave;i</p>",
        statusId: "2",
        originalEstimate: 9,
        timeTrackingSpent: 5,
        timeTrackingRemaining: 5,
        typeId: 1,
        priorityId: 1,
        projectId: 12853,
    },
};

export const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ONE_TASK: {
            const copyState = vlbl.copy(state);
            copyState.status = payload;
            return { ...state, status: copyState.status };
        }

        default:
            return state;
    }
};
