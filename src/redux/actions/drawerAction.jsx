import {
    HIDE_DRAWER,
    SEND_HANDLE_SUBMIT,
    SHOW_DRAWER,
    SHOW_EDIT_DRAWER,
} from "../contants/jiraContant";

export const showDrawerAction = (payload) => ({
    type: SHOW_DRAWER,
    payload,
});

export const hideDrawerAction = (payload) => ({
    type: HIDE_DRAWER,
    payload,
});

export const showEditDrawerAction = (payload) => ({
    type: SHOW_EDIT_DRAWER,
    payload,
});

export const sendHandleSubmitAction = (payload) => ({
    type: SEND_HANDLE_SUBMIT,
    payload,
});
