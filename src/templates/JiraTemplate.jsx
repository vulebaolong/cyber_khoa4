import { Route } from "react-router-dom";

export const JiraTemplate = (props) => {
    let { Component, ...restRoute } = props;

    return (
        <Route
            {...restRoute}
            render={(propsRoute) => {
                return (
                    <>
                        <Component {...propsRoute} />
                    </>
                );
            }}
        />
    );
};
