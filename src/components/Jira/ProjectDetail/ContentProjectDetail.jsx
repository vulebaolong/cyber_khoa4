import { useDispatch, useSelector } from "react-redux";
import style from "./ContentProjectDetail.module.css";
import { Avatar, Tooltip, Typography } from "antd";
import ContentProjectDetailModal from "./ContentProjectDetailModal";
import {
    componentContenModalAction,
    getOneTaskAction,
} from "../../../redux/actions/jiraAction";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { vlbl } from "vlbl";
const { Paragraph, Text } = Typography;

function ContentProjectDetail(props) {
    const toEl = useRef({});
    const selectEl = useRef({});

    const { projectDetail } = useSelector((state) => state.projectReducer);
    const dispatch = useDispatch();
    const { lstTask } = projectDetail;
    const [arr, setArr] = useState([]);
    useEffect(() => {
        if (lstTask !== undefined) {
            setArr(lstTask[0]?.lstTaskDeTail);
            console.log(lstTask[0]?.lstTaskDeTail);
        }
    }, []);

    const renderAvatar = (users) => {
        return users.map((user) => {
            return (
                <Tooltip key={user.id} title={user.name} placement="top">
                    <Avatar size="small" src={<img src={user.avatar} alt="avatar" />} />
                </Tooltip>
            );
        });
    };
    const handleOnDragStart = (e, item) => {
        // console.log(`OnDragStart - ${item.taskName}`, { e, item });
        selectEl.current = item;
    };
    const handleOnDragEnter = (e, item, listItemTask) => {
        toEl.current = { ...item };
        const selectId = selectEl.current.taskId;
        const seclectIndex = arr.findIndex((itemFind) => itemFind.taskId === selectId);

        const toId = item.taskId;
        const toIndex = arr.findIndex((itemFind) => itemFind.taskId === toId);
        // console.log("thằng đang nắm: ", seclectIndex);
        // console.log("thằng đang kéo tới: ", toIndex);
        // console.log(`OnDragOver - ${item.taskName}`, item.taskId, { e, item });
        // console.log(arr);

        let copyArr = vlbl.copy(arr);
        [copyArr[seclectIndex], copyArr[toIndex]] = [
            copyArr[toIndex],
            copyArr[seclectIndex],
        ];
        setArr(copyArr);
    };
    const handleOnDragEnd = (e, item, listItemTask) => {
        console.log(123);
        selectEl.current = {};
        setArr([...arr]);
    };

    // task trong 1 cột
    const renderListItemTask = (listItemTask) => {
        console.log(arr);
        return arr.map((item, index) => {
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
                    className={`list-group-item border border-secondary rounded-2`}
                    data-bs-toggle="modal"
                    data-bs-target="#modalMain"
                    onClick={() => {
                        dispatch(getOneTaskAction(item.taskId));
                    }}
                    draggable="true"
                    onDragStart={(e) => {
                        handleOnDragStart(e, item, listItemTask);
                    }}
                    onDragEnter={(e) => {
                        handleOnDragEnter(e, item, listItemTask);
                    }}
                    onDragEnd={(e) => {
                        handleOnDragEnd(e, item, listItemTask);
                    }}
                >
                    <div className="">
                        <Text
                            style={{
                                width: "100% ",
                                marginBottom: "1rem",
                            }}
                            ellipsis={{ tooltip: item.taskName }}
                        >
                            {item.taskName}
                        </Text>
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
                                size="small"
                            >
                                {renderAvatar(item.assigness)}
                            </Avatar.Group>
                        </div>
                    </div>
                </li>
            );
        });
    };

    // 4 cột
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
