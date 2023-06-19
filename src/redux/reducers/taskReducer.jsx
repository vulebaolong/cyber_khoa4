import { vlbl } from "vlbl";
import { CHANGE_ASSIGNEES, CHANGE_TASK, GET_ONE_TASK } from "../contants/jiraContant";
// priorityTask: {
//     priorityId: 1,
//     priority: "High",
// },
// taskTypeDetail: {
//     id: 1,
//     taskType: "bug",
// },
// assigness: [
//     {
//         id: 5214,
//         avatar: "https://ui-avatars.com/api/?name=Vũ Lê Bảo Long",
//         name: "Vũ Lê Bảo Long",
//         alias: "vu-le-bao-long",
//     },
//     {
//         id: 5227,
//         avatar: "https://ui-avatars.com/api/?name=admin",
//         name: "admin",
//         alias: "admin",
//     },
// ],
// lstComment: [],
// taskId: 10133,
// taskName: "Đây là task high",
// alias: "day-la-task-high",
// description: "<p>oke chiến đi n&agrave; c&aacute;c huynh đ&agrave;i</p>",
// statusId: "2",
// originalEstimate: 9,
// timeTrackingSpent: 5,
// timeTrackingRemaining: 5,
// typeId: 1,
// priorityId: 1,
// projectId: 12853,
const initialState = {
    task: {},
    changeTask: {
        listUserAsign: [],
        taskId: "",
        taskName: "",
        description: "",
        statusId: "",
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: 0,
        typeId: 0,
        priorityId: 0,
    },
};

export const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ONE_TASK: {
            const copyState = vlbl.copy(state);
            copyState.task = payload;
            return { ...state, task: copyState.task };
        }
        case CHANGE_TASK: {
            const { name, value } = payload;
            const copyState = vlbl.copy(state);
            copyState.task[name] = value;
            return {
                ...state,
                task: {
                    ...state.task,
                    [name]: copyState.task[name],
                },
            };
        }
        case CHANGE_ASSIGNEES: {
            console.log(payload);
            const copyState = vlbl.copy(state);
            copyState.task.assigness.push(payload);
            return {
                ...state,
                task: {
                    ...state.task,
                    assigness: copyState.task.assigness,
                },
            };
        }

        default:
            return state;
    }
};
