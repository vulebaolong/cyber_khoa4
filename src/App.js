import "./App.css";
import React from "react";
import { Switch } from "react-router-dom";
import { UserLoginTemplate } from "./templates/UserLoginTemplate";
import { HomeTemplate } from "./templates/HomeTemplate";
import { JiraTemplate } from "./templates/JiraTemplate";
import Loading from "./components/Other/Loading";
import indexJira from "./pages/Jira/indexJira";
import LoginJira from "./pages/Jira/LoginJira";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <>
            <Loading />
            <Switch>
                <UserLoginTemplate exact path="/" Component={LoginJira} />
                <UserLoginTemplate exact path="/login" Component={LoginJira} />
                <JiraTemplate exact path="/jira" Component={indexJira} />
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
