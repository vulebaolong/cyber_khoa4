import { useDispatch, useSelector } from "react-redux";
import style from "./ContentProjectDetail.module.css";
import { Avatar, Tooltip, Typography } from "antd";
import ContentProjectDetailModal from "./ContentProjectDetailModal";
import {
    componentContenModalAction,
    getOneTaskAction,
    updateStatusTaskAction,
} from "../../../redux/actions/jiraAction";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { vlbl } from "vlbl";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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

    //xử lý drag and drop
    const handleDragEnd = (result) => {
        console.log(result);
        const { projectId, taskId } = JSON.parse(result.draggableId);
        const { destination, source } = result;

        if (!destination) return;
        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        )
            return;

        // console.log({
        //     taskId,
        //     statusId: destination.droppableId,
        //     projectId,
        // });

        dispatch(
            updateStatusTaskAction({
                taskId,
                statusId: destination.droppableId,
                projectId,
            })
        );
    };

    const renderAvatar = (users) => {
        return users.map((user) => {
            return (
                <Tooltip key={user.id} title={user.name} placement="top">
                    <Avatar size="small" src={<img src={user.avatar} alt="avatar" />} />
                </Tooltip>
            );
        });
    };

    // task trong 1 cột
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
                <Draggable
                    key={`${item.taskId}`}
                    index={index}
                    draggableId={JSON.stringify({
                        projectId: item.projectId,
                        taskId: item.taskId,
                    })}
                >
                    {(provided) => {
                        return (
                            <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`list-group-item border border-secondary rounded-2`}
                                data-bs-toggle="modal"
                                data-bs-target="#modalMain"
                                onClick={() => {
                                    dispatch(getOneTaskAction(item.taskId));
                                }}
                                draggable="true"
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
                    }}
                </Draggable>
            );
        });
    };

    // 4 cột
    const renderListTask = () => {
        return (
            <DragDropContext onDragEnd={handleDragEnd}>
                {lstTask.map((task) => {
                    return (
                        <Droppable droppableId={task.statusId} key={task.statusId}>
                            {(provided) => {
                                return (
                                    <div className="col-3">
                                        <div
                                            className={`${style.card} card `}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <div className="mb-4">{task.statusName}</div>
                                            <ul className="list-group list-group-flush gap-2 border border-0">
                                                {renderListItemTask(task.lstTaskDeTail)}
                                                {provided.placeholder}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            }}
                        </Droppable>
                    );
                })}
            </DragDropContext>
        );
    };
    return (
        <div className="">
            <div className="row">{lstTask && renderListTask()}</div>
        </div>
    );
}
export default ContentProjectDetail;
