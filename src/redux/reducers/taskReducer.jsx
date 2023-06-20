import { vlbl } from "vlbl";
import {
    CHANGE_ASSIGNEES,
    CHANGE_TASK,
    DELETE_USER_ASSIGNEES,
    GET_ONE_TASK,
} from "../contants/jiraContant";

const initialState = {
    task: {},
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
        case DELETE_USER_ASSIGNEES: {
            console.log(payload);
            const copyState = vlbl.copy(state);
            copyState.task.assigness = copyState.task.assigness.filter(
                (user) => +user.id !== +payload.id
            );

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
