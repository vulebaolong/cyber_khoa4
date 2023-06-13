import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Router } from "react-router-dom";
import { history } from "./util/lib/history";
import { ConfigProvider, theme } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ConfigProvider
        theme={{
            algorithm: theme.darkAlgorithm,
        }}
    >
        <Router history={history}>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </ConfigProvider>
);
