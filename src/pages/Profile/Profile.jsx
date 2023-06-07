import { Redirect } from "react-router-dom";

function Profile() {
    if (localStorage.getItem("userLogin")) {
        return <div>Profile</div>;
    } else {
        alert("Vui lòng đăng nhập");
        return <Redirect to={"/login"} />;
    }
}
export default Profile;
