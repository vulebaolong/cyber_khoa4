import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Header from "./components/Home/Header";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import { UserLoginTemplate } from "./templates/UserLoginTemplate";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <UserLoginTemplate exact path="/login" Component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/about" component={About} />
                <Route exact path="/detail/:id" component={Detail} />
                <Route exact path="/profile" component={Profile} />
                <UserLoginTemplate exact path="/" Component={Login} />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
