import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import { UserLoginTemplate } from "./templates/UserLoginTemplate";
import Loading from "./components/Other/Loading";
import { useSelector } from "react-redux";
import { HomeTemplate } from "./templates/HomeTemplate";
import { JiraTemplate } from "./templates/JiraTemplate";
import indexJira from "./pages/Jira/indexJira";

function App() {
    const { loadingReducer } = useSelector((state) => state);
    const isLoading = loadingReducer.isLoading;

    return (
        <>
            <Switch>
                {isLoading && <Loading />}
                <UserLoginTemplate exact path="/" Component={Login} />
                <UserLoginTemplate exact path="/login" Component={Login} />
                <HomeTemplate exact path="/home" Component={Home} />
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
