import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { useState } from "react";
import { useRef } from "react";
import TimeTracking from "./TimeTracking";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProjectsAction } from "../../../../redux/actions/jiraAction";

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}
const onChangeSelectAssignees = (value) => {
    console.log(`selected ${value}`);
};
const onChangeSelectProject = (value) => {
    console.log(`selected ${value}`);
};
const onSearchSelectProject = (value) => {
    console.log("search:", value);
};

function FormCreateTask(props) {
    const editorRef = useRef(null);
    const { projects } = useSelector((state) => state.projectReducer);
    const dispatch = useDispatch();
    const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = props;
    const handleEditorChange = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            setFieldValue("description", editorRef.current.getContent());
        }
    };
    const optionSelect = projects.map((project) => {
        return {
            value: `${project.id}`,
            label: `${project.projectName}`,
        };
    });
    useEffect(() => {
        dispatch(getAllProjectsAction());
    }, [dispatch]);
    return (
        <form>
            <div className="">
                <label className="form-label">Project</label>
                <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChangeSelectProject}
                    onSearch={onSearchSelectProject}
                    filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={optionSelect}
                />
            </div>

            <div className="row mt-3">
                <div className="col-6">
                    <div className="form-floating">
                        <select name="priorityId" className="form-select" id="priorityId">
                            <option value="54">Hight</option>
                            <option value="55">Low</option>
                        </select>
                        <label htmlFor="priorityId">Priority</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-floating">
                        <select name="typeId" className="form-select" id="typeId">
                            <option value="54">New task</option>
                            <option value="55">Bugs</option>
                        </select>
                        <label htmlFor="typeId">Task type</label>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-6 d-flex flex-column justify-content-between">
                    <label className="form-label">Assignees</label>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select"
                        defaultValue={["a10", "c12"]}
                        onChange={onChangeSelectAssignees}
                        options={options}
                    />
                    <div className="row mt-3">
                        <div className="col-12">
                            {/* originalEstimate */}
                            <div className="">
                                <label htmlFor="originalEstimate" className="form-label">
                                    Original Estimate
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="originalEstimate"
                                    placeholder="Number"
                                    min={0}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6 d-flex flex-column justify-content-between">
                    <TimeTracking />
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
export default FormCreateTask;
