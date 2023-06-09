import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga/rootSaga";

// Tạo middleware Saga
const sagaMiddleware = createSagaMiddleware();

// Kết hợp middleware Saga và Redux DevTools
const middleware = [sagaMiddleware];

// Tạo store
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

// Chạy root Saga
sagaMiddleware.run(rootSaga);
