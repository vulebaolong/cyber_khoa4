import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Header from "./components/Home/Header";
import Login from "./components/Login/Login";
import Detail from "./pages/Detail/Detail";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/about" component={About} />
                <Route exact path="/detail/:id" component={Detail} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/" component={Home} />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
