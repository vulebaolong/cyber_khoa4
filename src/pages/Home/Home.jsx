import { useSelector } from "react-redux";
function Home(props) {
    const { userLogin } = useSelector((state) => state.userReducer);
    console.log(userLogin);

    return (
        <div>
            <p>{userLogin.name}</p>
            <img src={userLogin.avatar} alt="" />
            <p>{userLogin.email}</p>
        </div>
    );
}
export default Home;
