import { Editor } from "@tinymce/tinymce-react";
import { Input, InputNumber, Select } from "antd";
import { useRef } from "react";
import TimeTracking from "./TimeTracking";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getAllProjectsAction,
    getAllTaskTypeAction,
    getAllUserAction,
    getPriorityAction,
} from "../../../../redux/actions/jiraAction";
import * as Yup from "yup";
import { withFormik } from "formik";

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
    const editorRef = useRef(null);
    const dispatch = useDispatch();
    const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = props;
    const onChangeAntd = (value, name) => {
        console.log("value: ", value);
        console.log("name: ", name);
        setFieldValue(name, value);
    };

    const { projectReducer, taskTypeReducer, priorityReducer, userReducer } = useSelector(
        (state) => state
    );
    const { projects } = projectReducer;
    const { taskType } = taskTypeReducer;
    const { priority } = priorityReducer;
    const { users } = userReducer;
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
    let optionSelectAssignees = users.map((user) => {
        return {
            value: `${user.userId}`,
            label: `${user.name}`,
        };
    });

    const handleEditorChange = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            setFieldValue("description", editorRef.current.getContent());
        }
    };

    useEffect(() => {
        dispatch(getAllUserAction());
        dispatch(getPriorityAction());
        dispatch(getAllProjectsAction());
        dispatch(getAllTaskTypeAction());
    }, []);
    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <label className="form-label">Project</label>
                <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select a project"
                    optionFilterProp="children"
                    onChange={(value) => {
                        onChangeAntd(+value, "projectId");
                    }}
                    onSearch={onSearchSelectProject}
                    filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={optionSelectProject}
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
                        value={priority[0]?.priority}
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
                        value={taskType[0]?.taskType}
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

            <button type="submit">submit</button>
        </form>
    );
}

const MyEnhancedForm = {
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: "",
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: 0,
            typeId: 0,
            priorityId: 0,
        };
    },
    // validationSchema: Yup.object().shape({}),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log("values", values);
        // const { dispatch } = props;
    },
    displayName: "FormCreateTask",
};

const mapStateToProps = (state) => ({
    projectEdit: state.projectReducer.projectEdit,
});

export default connect(mapStateToProps)(withFormik(MyEnhancedForm)(FormCreateTask));
