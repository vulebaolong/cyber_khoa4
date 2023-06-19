import { useSelector } from "react-redux";
import style from "./InfoMain.module.css";
import { Avatar, Tooltip } from "antd";
import parse from "html-react-parser";

function InfoMain() {
    const { projectDetail } = useSelector((state) => state.projectReducer);
    const { members, description } = projectDetail;

    const renderAvatar = () => {
        return members.map((item) => {
            return (
                <Tooltip key={item.userId} title={item.name} placement="top">
                    <Avatar src={<img src={item.avatar} alt="avatar" />} />
                </Tooltip>
            );
        });
    };
    return (
        <>
            <div className="">{description && parse(description)}</div>
            <div className={`${style.info} my-5`}>
                <div className={`${style.input_search} input-group`}>
                    <span className="input-group-text" id="icon_search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-describedby="icon_search"
                    />
                </div>

                <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {members && renderAvatar()}
                </Avatar.Group>

                {/* <div className={`${style.avatar}`}>
                <button className="avatar_button" data-bs-toggle="button">
                    <img
                        className="rounded-circle"
                        src="https://picsum.photos/40"
                        alt=""
                    />
                </button>
                <button className="avatar_button" data-bs-toggle="button">
                    <img
                        className="rounded-circle"
                        src="https://picsum.photos/40"
                        alt=""
                    />
                </button>
                <button className="avatar_button" data-bs-toggle="button">
                    <img
                        className="rounded-circle"
                        src="https://picsum.photos/40"
                        alt=""
                    />
                </button>
            </div> */}

                <button type="button" className="btn btn-outline-secondary">
                    Only My Issues
                </button>
                <button type="button" className="btn btn-outline-secondary">
                    Recently Updated
                </button>
            </div>
        </>
    );
}
export default InfoMain;
