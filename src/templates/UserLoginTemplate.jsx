import { Route } from "react-router-dom";

export const UserLoginTemplate = (props) => {
    let { Component, ...restRoute } = props;

    return (
        <Route
            {...restRoute}
            render={(propsRoute) => {
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div
                                className="col-6"
                                style={{
                                    height: "100vh",
                                    backgroundImage: "url(https://picsum.photos/2000)",
                                    backgroundSize: "100%",
                                }}
                            ></div>
                            <div className="col-6">
                                <Component {...propsRoute} />
                            </div>
                        </div>
                    </div>
                );
            }}
        />
    );
};
