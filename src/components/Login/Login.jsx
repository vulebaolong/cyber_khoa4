import { useState } from "react";

function Login(props) {
    const [userLogin, setUserLogin] = useState({
        taiKhoan: "",
        matKhau: "",
    });
    console.log(userLogin);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userLogin.taiKhoan === "123" && userLogin.matKhau === "123") {
            props.history.push("/profile");
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
        }
    };
    return (
        <div className="container">
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <h3 className="text-center">Login</h3>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="text"
                        name="taiKhoan"
                        className="form-control"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="matKhau"
                        className="form-control"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}
export default Login;
