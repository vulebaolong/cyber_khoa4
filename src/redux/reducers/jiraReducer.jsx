const initialState = {
    data: "",
};

export const jiraReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "TEXT": {
            const copyState = JSON.parse(JSON.stringify(state));
            console.log(payload);
            return copyState;
        }

        default:
            return state;
    }
};
