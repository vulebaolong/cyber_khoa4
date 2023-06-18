import { connect, useDispatch, useSelector } from "react-redux";
import style from "./ContentProjectDetail.module.css";
import parse from "html-react-parser";
import { withFormik } from "formik";
import { useEffect } from "react";
import { getAllStatusAction, getPriorityAction } from "../../../redux/actions/jiraAction";
import { Avatar, Button, Input, InputNumber, Select } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

const onSearchSelectAssignees = (value) => {
    // console.log(`Search SelectAssignee ${value}`);
};

function ContentProjectDetailModal(props) {
    const dispatch = useDispatch();
    const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = props;
    const { taskReducer, statusReducer, priorityReducer } = useSelector((state) => state);
    const { task } = taskReducer;
    const { status } = statusReducer;
    const { priority } = priorityReducer;

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

    useEffect(() => {
        dispatch(getAllStatusAction());
        dispatch(getPriorityAction());
    }, []);

    const renderAssignees = () => {
        return task.assigness.map((user) => {
            return (
                <div
                    key={user.id}
                    className={`${style.reporter_item} d-flex align-items-center gap-1`}
                >
                    <Avatar src={user.avatar} size={25} />
                    <div>{user.name}</div>
                    <CloseOutlined />
                </div>
            );
        });
    };
    return (
        <>
            <div className="modal-header">
                <div className="headerleft">
                    <div className={`${style.header_item}`}>
                        <div className="">
                            <i className="fa-solid fa-square-check" />
                        </div>
                        <div className="m-0">{task.taskName}</div>
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
                        <textarea
                            className={`${style.title}`}
                            placeholder="Short summary"
                            style={{ height: 48 }}
                            defaultValue={"This is an issue of type: Task."}
                        />

                        {/* Description */}
                        <div className="">
                            <p>Description</p>
                            {parse(task.description)}
                        </div>

                        <p>Comments</p>

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

                    {/* Phải */}
                    <div className="col-4">
                        {/* Status */}
                        <div className="">
                            <label className="form-label">Status</label>
                            <Select
                                name="statusId"
                                value={`${values.statusId}`}
                                style={{
                                    width: "100%",
                                }}
                                onChange={(value) => {
                                    onChangeAntd(+value, "statusId");
                                }}
                                options={optionSelectStatus}
                            />
                        </div>

                        {/* Assignees and */}
                        <div className="assigness mt-3">
                            <label className="form-label">Assignees</label>
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                                {renderAssignees()}
                            </div>

                            <Button type="link" className="d-flex align-items-center">
                                <PlusOutlined /> Add more
                            </Button>
                        </div>

                        {/* Priority */}
                        <div className="priority mt-3">
                            <label className="form-label">Priority</label>
                            <Select
                                name="priorityId"
                                value={`${values.priorityId}`}
                                style={{
                                    width: "100%",
                                }}
                                onChange={(value) => {
                                    onChangeAntd(+value, "priorityId");
                                }}
                                options={optionSelectPriority}
                            />
                        </div>

                        {/* ORIGINAL ESTIMATE */}
                        <div className="original mt-3">
                            <label className="form-label">
                                Original Estimate (HOURS)
                            </label>
                            <Input type="number" value={values.originalEstimate} />
                        </div>

                        {/* Time tracking */}
                        <div className="time mt-3">
                            <label className="form-label">Time Tracking</label>
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
