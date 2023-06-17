import { Editor } from "@tinymce/tinymce-react";
import { Input, InputNumber, Select } from "antd";
import { useRef, useState } from "react";
import TimeTracking from "./TimeTracking";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    createTaskAction,
    getAllProjectsAction,
    getAllStatusAction,
    getAllTaskTypeAction,
    getAllUserAction,
    getPriorityAction,
    getUserByProjectIdAction,
} from "../../../../redux/actions/jiraAction";
import * as Yup from "yup";
import { withFormik } from "formik";
import { sendHandleSubmitAction } from "../../../../redux/actions/drawerAction";

const onSearchSelectProject = (value) => {
    console.log(`Search Project ${value}`);
};
const onSearchSelectAssignees = (value) => {
    console.log(`Search SelectAssignee ${value}`);
};

const onChangeSelectAssignees = (value) => {
    console.log(`Select Assignees ${value}`);
};
const onChangeSelectProject = (value, name) => {
    console.log(`Select Project ${value} `);
    console.log("name: ", name);
};
const onChangeSelectTaskType = (value) => {
    console.log(`Select TypeId ${value}`);
};
const onChangeSelectPriority = (value) => {
    console.log(`Select Priority ${value}`);
};
const onChangeInputOriginalEstimate = (value) => {
    console.log(`Input OriginalEstimate ${value}`);
};
const onChangeInputRemaining = (value) => {
    console.log(`Input Time Remaining ${value}`);
};
const onChangeInputSpent = (value) => {
    console.log(`Input Time Spent ${value}`);
};

function FormCreateTask(props) {
    const [valueAssignees, setValueAssignees] = useState([]);
    const editorRef = useRef(null);
    const dispatch = useDispatch();
    const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = props;
    console.log(values);
    const onChangeAntd = (value, name) => {
        console.log("value: ", value);
        console.log("name: ", name);
        setFieldValue(name, value);
    };

    const {
        projectReducer,
        taskTypeReducer,
        priorityReducer,
        userReducer,
        statusReducer,
    } = useSelector((state) => {
        return state;
    });
    const { projects } = projectReducer;
    const { taskType } = taskTypeReducer;
    const { priority } = priorityReducer;
    const { userByProject } = userReducer;
    const { status } = statusReducer;
    const optionTaskType = taskType.map((task) => ({
        label: task.taskType,
        value: task.id,
    }));
    const optionSelectProject = projects.map((project) => {
        return {
            value: `${project.id}`,
            label: `${project.projectName}`,
        };
    });
    const optionSelectPriority = priority.map((priority) => {
        return {
            value: `${priority.priorityId}`,
            label: `${priority.priority}`,
        };
    });
    let optionSelectAssignees = userByProject.map((user) => {
        return {
            value: `${user.userId}`,
            label: `${user.name}`,
        };
    });
    let optionSelectStatus = status.map((status) => {
        return {
            value: `${status.statusId}`,
            label: `${status.statusName}`,
        };
    });

    const handleEditorChange = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            setFieldValue("description", editorRef.current.getContent());
        }
    };

    useEffect(() => {
        if (projects.length > 0) {
            dispatch(getUserByProjectIdAction(+projects[0].id));
        }
    }, [projects]);

    useEffect(() => {
        dispatch(sendHandleSubmitAction(handleSubmit));
        dispatch(getAllProjectsAction());
        dispatch(getAllStatusAction());
        dispatch(getPriorityAction());
        dispatch(getAllTaskTypeAction());
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <label className="form-label">Project</label>
                <Select
                    style={{ width: "100%" }}
                    showSearch
                    defaultValue={projects[0]?.projectName}
                    placeholder="Select a project"
                    optionFilterProp="children"
                    onChange={(value) => {
                        dispatch(getUserByProjectIdAction(value));
                        onChangeAntd(+value, "projectId");
                        setFieldValue("listUserAsign", []);
                    }}
                    onSearch={onSearchSelectProject}
                    filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={optionSelectProject}
                />
            </div>

            <div className="mt-3">
                <label className="form-label">Status</label>
                <Select
                    name="statusId"
                    value={optionSelectStatus[0]?.label}
                    style={{
                        width: "100%",
                    }}
                    onChange={(value) => {
                        onChangeAntd(+value, "statusId");
                    }}
                    options={optionSelectStatus}
                />
            </div>

            <div className="mt-3">
                <label className="form-label">Task name</label>
                <Input
                    placeholder="Basic usage"
                    name="taskName"
                    onChange={(value) => {
                        onChangeAntd(value.target.value, "taskName");
                    }}
                />
            </div>

            <div className="row mt-3">
                <div className="col-6">
                    <label className="form-label">Priority</label>
                    <Select
                        name="priorityId"
                        defaultValue={priority[0]?.priority}
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
                <div className="col-6">
                    <label className="form-label">Task type</label>
                    <Select
                        name="typeId"
                        defaultValue={taskType[0]?.taskType}
                        style={{
                            width: "100%",
                        }}
                        onChange={(value) => {
                            onChangeAntd(value, "typeId");
                        }}
                        options={optionTaskType}
                    />
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-6 d-flex flex-column justify-content-between">
                    <label className="form-label">Assignees</label>
                    <Select
                        mode="multiple"
                        value={values.listUserAsign}
                        showSearch
                        optionFilterProp="label"
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select assignees"
                        onChange={(value) => {
                            onChangeAntd(value, "listUserAsign");
                        }}
                        onSearch={onSearchSelectAssignees}
                        options={optionSelectAssignees}
                    />
                    <div className="row mt-3">
                        <div className="col-12">
                            {/* originalEstimate */}
                            <div className="">
                                <label className="form-label">Original Estimate</label>
                                <InputNumber
                                    type="number"
                                    style={{
                                        width: "100%",
                                    }}
                                    min={1}
                                    onChange={(value) => {
                                        onChangeAntd(value, "originalEstimate");
                                    }}
                                    placeholder="Number"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6 d-flex flex-column justify-content-between">
                    <TimeTracking
                        onChangeInputRemaining={onChangeInputRemaining}
                        onChangeInputSpent={onChangeInputSpent}
                        onChangeAntd={onChangeAntd}
                    />
                </div>
            </div>

            <div className="mt-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <Editor
                    name="description"
                    apiKey="hngjtnxm2rdvc4vl3dlgk44ds8y6fpb9ijo0fsxku53q8f0b"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={values?.description}
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
            </div>
        </form>
    );
}

const MyEnhancedForm = {
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projects, status, priority, taskType } = props;

        return {
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: +status[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: +projects[0]?.id,
            typeId: +taskType[0]?.id,
            priorityId: +priority[0]?.priorityId,
        };
    },
    // validationSchema: Yup.object().shape({}),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log("values", values);
        const { dispatch } = props;
        dispatch(createTaskAction(values));
    },
    displayName: "FormCreateTask",
};

const mapStateToProps = (state) => {
    return {
        projects: state.projectReducer.projects,
        status: state.statusReducer.status,
        priority: state.priorityReducer.priority,
        taskType: state.taskTypeReducer.taskType,
    };
};

export default connect(mapStateToProps)(withFormik(MyEnhancedForm)(FormCreateTask));
