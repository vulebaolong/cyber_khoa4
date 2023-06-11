import { Field, withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { userSigninAction } from "../../redux/actions/jiraAction";

function Login(props) {
    // console.log(props);
    const { touched, errors, handleChange, handleSubmit, setFieldValue } = props;
    const handleTry = () => {
        // inputEmail.current.value = "longlong@gmail.com";
        // inputPassword.current.value = "123456";
        setFieldValue("email", "longlong@gmail.com");
        setFieldValue("password", "123456");
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <div className="container">
                <form
                    onSubmit={handleSubmit}
                    style={{ minWidth: "200px", width: "300px", margin: "auto" }}
                >
                    <h3 className="text-center">Login Jira</h3>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <Field
                            onChange={handleChange}
                            name="email"
                            type="text"
                            className="form-control"
                        />
                        {errors.email && touched.email && (
                            <div className="text-danger">*{errors.email}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <Field
                            onChange={handleChange}
                            type="password"
                            name="password"
                            className="form-control"
                        />
                        {errors.password && touched.password && (
                            <div className="text-danger">*{errors.password}</div>
                        )}
                    </div>

                    <button
                        style={{ width: "100%" }}
                        type="submit"
                        className="btn btn-primary mb-2"
                    >
                        Login
                    </button>
                    <button
                        style={{ width: "100%" }}
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            handleTry();
                        }}
                    >
                        Try
                    </button>
                </form>
            </div>
        </div>
    );
}

const MyEnhancedForm = {
    mapPropsToValues: () => ({ email: "", password: "" }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required("trường email không được để trống")
            .email("phải là email"),
        password: Yup.string()
            .required("trường email không được để trống")
            .min(6, "password phải từ 6 ký tự")
            .max(32, "password phải chỉ tối đa 32 ký tự"),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        const { dispatch, history } = props;
        console.log(props);
        const data = {
            values,
            history,
        };
        dispatch(userSigninAction(data));
    },

    displayName: "Login Jira",
};
export default connect()(withFormik(MyEnhancedForm)(Login));
