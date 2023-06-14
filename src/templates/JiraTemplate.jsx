import { Route } from "react-router-dom";
import SideBar from "./../components/Jira/SideBar/SideBar";
import Menu from "./../components/Jira/Menu/Menu";
import ModalMain from "./../components/Jira/Main/ModalMain/ModalMain";

export const JiraTemplate = (props) => {
    let { Component, ...restRoute } = props;

    return (
        <Route
            {...restRoute}
            render={(propsRoute) => {
                return (
                    <>
                        <SideBar />
                        <Menu />
                        <Component {...propsRoute} />
                        <ModalMain />
                    </>
                );
            }}
        />
    );
};