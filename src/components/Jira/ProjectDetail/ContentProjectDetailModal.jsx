import { connect, useDispatch, useSelector } from "react-redux";
import style from "./ContentProjectDetail.module.css";
import parse from "html-react-parser";
import { withFormik } from "formik";
import { useEffect } from "react";
import {
    changeAndUpdateApiTaskAction,
    changeAssigneesAction,
    changeTaskAction,
    deleteUserAssignessAction,
    getAllStatusAction,
    getAllTaskTypeAction,
    getPriorityAction,
    updateStatusTaskAction,
} from "../../../redux/actions/jiraAction";
import {
    Avatar,
    Button,
    Input,
    InputNumber,
    Popover,
    Select,
    Space,
    Typography,
} from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { CHANGE_ASSIGNEES } from "../../../redux/contants/jiraContant";
const { Text, Link } = Typography;

function ContentProjectDetailModal(props) {
    const [showEditor, setShowEditor] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const dispatch = useDispatch();
    const editorRef = useRef(null);

    const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = props;
    const {
        taskReducer,
        statusReducer,
        priorityReducer,
        taskTypeReducer,
        projectReducer,
    } = useSelector((state) => state);
    const { task } = taskReducer;
    const { status } = statusReducer;
    const { priority } = priorityReducer;
    const { taskType } = taskTypeReducer;
    const { projectDetail } = projectReducer;
    const onChangeAntd = (value, name) => {
        console.log("value: ", value);
        console.log("name: ", name);
        setFieldValue(name, value);
    };
    const optionSelectStatus = status.map((status) => {
        return {
            value: `${status.statusId}`,
            label: `${status.statusName}`,
        };
    });
    const optionSelectPriority = priority.map((priority) => {
        return {
            value: `${priority.priorityId}`,
            label: `${priority.priority}`,
        };
    });
    const optionSelectTask = taskType.map((task) => {
        return {
            value: `${task.id}`,
            label: `${task.taskType}`,
        };
    });
    const optionSelectAssignees = projectDetail.members
        .filter((mem) => {
            const index = task.assigness.findIndex((us) => us.id === mem.userId);
            if (index === -1) {
                return true;
            }
        })
        .map((user) => {
            return {
                value: `${user.userId}`,
                label: `${user.name}`,
            };
        });

    useEffect(() => {
        dispatch(getAllStatusAction());
        dispatch(getPriorityAction());
        dispatch(getAllTaskTypeAction());
    }, []);

    const renderAssignees = () => {
        return task.assigness.map((user) => {
            return (
                <div
                    key={user.id}
                    className={`${style.reporter_item} d-flex align-items-center gap-1`}
                    onClick={() => {
                        dispatch(deleteUserAssignessAction(user));
                    }}
                >
                    <Avatar src={user.avatar} size={20} />
                    <Text>{user.name}</Text>
                    <CloseOutlined />
                </div>
            );
        });
    };
    const handleEditorChange = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            // setHistoryDescription(editorRef.current.getContent());
            // setFieldValue("description", editorRef.current.getContent());
        }
    };
    const renderDescription = () => {
        const editor = (
            <Space direction="vertical" style={{ width: "100%" }}>
                <Editor
                    style={{ with: "100%" }}
                    name="description"
                    initialValue={task.description}
                    apiKey="hngjtnxm2rdvc4vl3dlgk44ds8y6fpb9ijo0fsxku53q8f0b"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                        ],
                        toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        skin: "oxide-dark",
                        content_css: "dark",
                    }}
                    onEditorChange={handleEditorChange}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            handleChangeTask(
                                "description",
                                editorRef.current.getContent()
                            );
                            setShowEditor(false);
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        type="text"
                        onClick={() => {
                            setShowEditor(false);
                        }}
                    >
                        Cancel
                    </Button>
                </Space>
            </Space>
        );
        const jsxDescription = (
            <div
                onClick={() => {
                    setShowEditor(!showEditor);
                }}
            >
                {parse(task.description)}
            </div>
        );
        return <>{showEditor ? editor : jsxDescription}</>;
    };

    const handleChangeTask = (name, value) => {
        dispatch(changeTaskAction({ name, value }));
    };

    const selectAssignees = (
        <Select
            optionFilterProp="label"
            showSearch
            autoClearSearchValue={true}
            style={{
                width: "100%",
            }}
            placeholder="Search assignees"
            onChange={(value) => {
                console.log(value);
                let userSelect = projectDetail.members.find((mem) => {
                    return mem.userId === +value;
                });

                userSelect = {
                    ...userSelect,
                    id: userSelect.userId,
                    type: CHANGE_ASSIGNEES,
                };
                console.log("userSelect", userSelect);
                dispatch(changeAndUpdateApiTaskAction(userSelect));
            }}
            onSelect={() => {
                setShowSelect(false);
            }}
            onBlur={() => {
                setShowSelect(false);
            }}
            open={true}
            options={optionSelectAssignees}
        />
    );

    return (
        <>
            <div className="modal-header">
                <div className="headerleft">
                    <div className="d-flex align-items-center">
                        <div className="">
                            <i className="fa-solid fa-square-check" />
                        </div>

                        <div className="m-0">
                            <Select
                                value={`${task.typeId}`}
                                style={{ width: 100 }}
                                bordered={false}
                                options={optionSelectTask}
                                onChange={(value) => {
                                    handleChangeTask("typeId", value);
                                }}
                            />
                            <span>{task.taskId}</span>
                        </div>
                    </div>
                </div>

                <div className="headerright d-flex align-items-center gap-2">
                    <div className={`${style.header_item}`}>
                        <i className="fa-solid fa-paper-plane"></i>
                        <div className="m-0">Give feedback</div>
                    </div>
                    <div className={`${style.header_item}`}>
                        <i className="fa-solid fa-link"></i>
                        <div className="m-0">Copy link</div>
                    </div>
                    <div className={`${style.header_item}`}>
                        <div className="">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                    <div className={`${style.header_item}`} data-bs-dismiss="modal">
                        <div className="">
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-body">
                <div className="row">
                    {/* Trái */}
                    <div className="col-8">
                        {/* taskName */}
                        <Input
                            style={{
                                padding: "4px 0",
                                fontSize: "1.5rem",
                                fontWeight: "500",
                            }}
                            placeholder="Borderless"
                            bordered={false}
                            value={task.taskName}
                            onChange={(e) => {
                                const value = e.target.value;
                                dispatch(
                                    changeAndUpdateApiTaskAction({
                                        name: "taskName",
                                        value,
                                    })
                                );
                            }}
                        />

                        {/* Description */}
                        <div className="">
                            <label className="form-label">
                                <strong>Description</strong>
                            </label>
                            {renderDescription()}
                        </div>

                        {/* Comments */}
                        <div className="">
                            <label className="form-label">
                                <strong>Comments</strong>
                            </label>
                            <div className="comment d-flex gap-3">
                                <div className="">
                                    <img
                                        className="rounded-circle"
                                        src="https://picsum.photos/35"
                                        alt=""
                                    />
                                </div>
                                <div style={{ width: "100%" }}>
                                    <div className={`${style.comment_write}`}>
                                        Add a comment...
                                    </div>
                                    <div className={`${style.comment_note}`}>
                                        <strong>Pro tip:</strong>press
                                        <span>M</span>to comment
                                    </div>
                                </div>
                            </div>
                            <div className="issue-comment d-flex gap-3 mt-4">
                                <div className="">
                                    <img
                                        className="rounded-circle"
                                        src="https://picsum.photos/35"
                                        alt=""
                                    />
                                </div>
                                <div className="">
                                    <div className="d-flex gap-2">
                                        <div>Lord Gaben</div>
                                        <div>20 hours ago</div>
                                    </div>

                                    <p className="">
                                        An old silent pond... A frog jumps into the pond,
                                        splash! Silence again.
                                    </p>
                                    <div className="d-flex gap-2">
                                        <div className="">Edit</div>
                                        <div className="">Delete</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phải */}
                    <div className="col-4">
                        {/* Status */}
                        <div className="">
                            <label className="form-label">
                                <strong>Status</strong>
                            </label>
                            <Select
                                name="statusId"
                                value={`${values.statusId}`}
                                style={{
                                    width: "100%",
                                }}
                                onSelect={(value) => {
                                    dispatch(
                                        changeAndUpdateApiTaskAction({
                                            name: "statusId",
                                            value,
                                        })
                                    );
                                }}
                                options={optionSelectStatus}
                            />
                        </div>

                        {/* Assignees */}
                        <div className="assigness mt-3">
                            <label className="form-label">
                                <strong>Assignees</strong>
                            </label>
                            <div
                                className="d-flex align-items-center gap-2 flex-wrap"
                                style={{ position: "relative" }}
                            >
                                {renderAssignees()}
                                <Button
                                    type="link"
                                    className="d-flex align-items-center"
                                    onClick={() => {
                                        setShowSelect(!showSelect);
                                    }}
                                >
                                    <PlusOutlined /> Add more
                                </Button>
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        bottom: -35,
                                        left: 0,
                                    }}
                                >
                                    {showSelect && selectAssignees}
                                </div>
                            </div>
                        </div>

                        {/* Priority */}
                        <div className="priority mt-3">
                            <label className="form-label">
                                <strong>Priority</strong>
                            </label>
                            <Select
                                name="priorityId"
                                value={`${values.priorityId}`}
                                style={{
                                    width: "100%",
                                }}
                                onChange={(value) => {
                                    dispatch(
                                        changeAndUpdateApiTaskAction({
                                            name: "priorityId",
                                            value,
                                        })
                                    );
                                }}
                                showSearch
                                options={optionSelectPriority}
                            />
                        </div>

                        {/* ORIGINAL ESTIMATE */}
                        <div className="original mt-3">
                            <label className="form-label">
                                <strong>Original Estimate (HOURS)</strong>
                            </label>

                            <InputNumber
                                type="number"
                                name="timeTrackingSpent"
                                value={task.originalEstimate}
                                style={{
                                    width: "100%",
                                }}
                                min={1}
                                onChange={(value) => {
                                    if (value === null) value = 0;
                                    dispatch(
                                        changeAndUpdateApiTaskAction({
                                            name: "originalEstimate",
                                            value,
                                        })
                                    );
                                }}
                                placeholder="Number"
                            />
                        </div>

                        {/* Time tracking */}
                        <div className="time mt-3">
                            <label className="form-label">
                                <strong>Time Tracking</strong>
                            </label>
                            <div
                                style={{
                                    borderRadius: "0.2rem",
                                    padding: "0.2rem 0.5rem",
                                }}
                                className={`d-flex align-items-center gap-3`}
                            >
                                <div className="py-2">
                                    <i
                                        style={{ fontSize: "1.3rem" }}
                                        className="fa-sharp fa-solid fa-stopwatch"
                                    ></i>
                                </div>
                                <div className="" style={{ width: "100%" }}>
                                    <div
                                        style={{ width: "100%", height: "5px" }}
                                        className="progress"
                                        role="progressbar"
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${
                                                    (+values.timeTrackingSpent /
                                                        (+values.timeTrackingSpent +
                                                            +values.timeTrackingRemaining)) *
                                                    100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                        <div>{values.timeTrackingSpent}h logged</div>
                                        <div>
                                            {values.timeTrackingRemaining}h estimated
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6 d-flex flex-column justify-content-between">
                                    <label className="form-label">Time spent</label>
                                    <InputNumber
                                        type="number"
                                        name="timeTrackingSpent"
                                        style={{
                                            width: "100%",
                                        }}
                                        min={1}
                                        onChange={(value) => {
                                            if (value === null) value = 0;
                                            dispatch(
                                                changeAndUpdateApiTaskAction({
                                                    name: "timeTrackingSpent",
                                                    value,
                                                })
                                            );
                                        }}
                                        placeholder="Number"
                                    />
                                </div>
                                <div className="col-6 d-flex flex-column justify-content-between">
                                    <label className="form-label">Time remaining</label>
                                    <InputNumber
                                        type="number"
                                        name="timeTrackingRemaining"
                                        style={{
                                            width: "100%",
                                        }}
                                        min={1}
                                        onChange={(value) => {
                                            if (value === null) value = 0;
                                            dispatch(
                                                changeAndUpdateApiTaskAction({
                                                    name: "timeTrackingRemaining",
                                                    value,
                                                })
                                            );
                                        }}
                                        placeholder="Number"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="createtime">
                            <div>Created at 21 hours ago</div>
                            <div>Updated at an hour ago</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BUTTON Close, Save changes */}
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Close
                </button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                    Save changes
                </button>
            </div>
        </>
    );
}

const MyEnhancedForm = {
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { task } = props;
        return {
            statusId: task.statusId,
            priorityId: task.priorityId,
            originalEstimate: task.originalEstimate,
            timeTrackingSpent: task.timeTrackingSpent,
            timeTrackingRemaining: task.timeTrackingRemaining,
        };
    },
    // validationSchema: Yup.object().shape({}),
    handleSubmit: (values, { props, setSubmitting }) => {
        // console.log("values submit", values);
        // const { dispatch } = props;
        // dispatch(createTaskAction(values));
    },
    displayName: "FormCreateTask",
};

const mapStateToProps = (state) => {
    return {
        task: state.taskReducer.task,
    };
};

export default connect(mapStateToProps)(
    withFormik(MyEnhancedForm)(ContentProjectDetailModal)
);
