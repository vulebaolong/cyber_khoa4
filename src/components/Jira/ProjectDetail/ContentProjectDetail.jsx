import { useDispatch, useSelector } from "react-redux";
import style from "./ContentProjectDetail.module.css";
import { Avatar, Tooltip } from "antd";
import { componentContenModal } from "../../../redux/actions/jiraAction";
import ContentProjectDetailModal from "./ContentProjectDetailModal";

function ContentProjectDetail(props) {
    const { projectDetail } = useSelector((state) => state.projectReducer);
    const dispatch = useDispatch();
    const { lstTask } = projectDetail;
    console.log(lstTask);
    const renderAvatar = (users) => {
        return users.map((user) => {
            return (
                <Tooltip key={user.id} title={user.name} placement="top">
                    <Avatar src={<img src={user.avatar} alt="avatar" />} />
                </Tooltip>
            );
        });
    };
    const renderListItemTask = (listItemTask) => {
        return listItemTask.map((item, index) => {
            const renderIconPriority = () => {
                const { priority } = item.priorityTask;
                let color = "white";
                // high: red, medium: #ffcccc, low: #01ff01, lowest: #cdffca
                if (priority === "High") color = "red";
                if (priority === "Medium") color = "#ffcccc";
                if (priority === "Low") color = "#01ff01";
                if (priority === "Lowest") color = "#cdffca";

                return <i style={{ color: color }} className="fa-solid fa-arrow-up"></i>;
            };
            return (
                <li
                    key={index}
                    className="list-group-item border border-secondary rounded-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalMain"
                    onClick={() => {
                        dispatch(componentContenModal(<ContentProjectDetailModal />));
                    }}
                >
                    <div className="">
                        <p className="">{item.taskName}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                                <i className="fa-solid fa-square-check"></i>
                                {renderIconPriority()}
                            </div>
                            <Avatar.Group
                                maxCount={2}
                                maxStyle={{
                                    color: "#f56a00",
                                    backgroundColor: "#fde3cf",
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                {renderAvatar(item.assigness)}
                            </Avatar.Group>
                        </div>
                    </div>
                </li>
            );
        });
    };
    const renderListTask = () => {
        return lstTask.map((task) => {
            return (
                <div key={task.statusId} className="col-3">
                    <div className={`${style.card} card `}>
                        <div className="mb-4">{task.statusName}</div>
                        <ul className="list-group list-group-flush gap-2 border border-0">
                            {renderListItemTask(task.lstTaskDeTail)}
                        </ul>
                    </div>
                </div>
            );
        });
    };
    return (
        <div className="">
            <div className="row">{lstTask && renderListTask()}</div>
        </div>
    );
}
export default ContentProjectDetail;
