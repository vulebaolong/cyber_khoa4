import "./App.css";
import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { UserLoginTemplate } from "./templates/UserLoginTemplate";
import { HomeTemplate } from "./templates/HomeTemplate";
import { JiraTemplate } from "./templates/JiraTemplate";
import Loading from "./components/Other/Loading";
import LoginJira from "./pages/Jira/LoginJira";
import NotFound from "./pages/NotFound/NotFound";
import ProjectSetting from "./pages/Jira/ProjectCreate";
import BoardJira from "./pages/Jira/BoardJira";
import ProjectManager from "./pages/Jira/ProjectManager";
import DrawerRight from "./HOC/DrawerRight";
// import Fun from "./components/Jira/Fun/Fun";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { initNotificationAction } from "./redux/actions/jiraAction";
import ProjectDetail from "./pages/Jira/ProjectDetail";
import ProjectCreate from "./pages/Jira/ProjectCreate";

function App() {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initNotificationAction(api));
    }, [dispatch, api]);

    return (
        <>
            {contextHolder}
            {/* <Fun /> */}
            <DrawerRight />
            <Loading />
            <Switch>
                <UserLoginTemplate exact path="/" Component={LoginJira} />
                <UserLoginTemplate exact path="/login" Component={LoginJira} />
                <JiraTemplate exact path="/projectcreate" Component={ProjectCreate} />
                <JiraTemplate exact path="/projectmanager" Component={ProjectManager} />
                <JiraTemplate exact path="/projectdetail/:id" Component={ProjectDetail} />
                <HomeTemplate path="*" Component={NotFound} />
                {/* <Route exact path="/contact" component={Contact} />
                <Route exact path="/about" component={About} />
                <Route exact path="/detail/:id" component={Detail} />
                <Route exact path="/profile" component={Profile} /> */}
            </Switch>
        </>
    );
}

export default App;
