import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { USER_SIGNIN_API_SAGA } from "./../../redux/contants/jiraContant";
import { userSigninAction } from "../../redux/actions/jiraAction";

function Login(props) {
    // console.log(props);
    const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
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
                        <input
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
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            className="form-control"
                        />
                        {errors.password && touched.password && (
                            <div className="text-danger">*{errors.password}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Login
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
        const { dispatch } = props;
        console.log(values);
        dispatch(userSigninAction(values));
    },

    displayName: "Login Jira",
};
export default connect()(withFormik(MyEnhancedForm)(Login));
