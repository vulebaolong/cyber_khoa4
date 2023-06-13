import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { sendHandleSubmitAction } from "../../../../redux/actions/drawerAction";
import * as Yup from "yup";
import { withFormik } from "formik";
import {
    projectCategoryAction,
    updateProjectAction,
} from "../../../../redux/actions/jiraAction";

function FormEditProject(props) {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = props;
    const projectCategory = useSelector(
        (state) => state.projectCategoryReducer.projectCategory
    );
    // console.log(values);
    // const handleSubmit = () => {
    //     console.log("ở đây");
    // };
    useEffect(() => {
        dispatch(projectCategoryAction());
        dispatch(sendHandleSubmitAction(handleSubmit));
    }, []);

    const handleEditorChange = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            setFieldValue("description", editorRef.current.getContent());
        }
    };

    return (
        <form>
            <div className="row">
                <div className="col-4 mb-3">
                    <label htmlFor="id" className="form-label">
                        Id
                    </label>
                    <input
                        value={values.id}
                        type="text"
                        className="form-control"
                        id="id"
                        name="id"
                        disabled
                    />
                </div>
                <div className="col-4 mb-3">
                    <label htmlFor="projectName" className="form-label">
                        projectName
                    </label>
                    <input
                        value={values.projectName}
                        type="text"
                        className="form-control"
                        id="projectName"
                        name="projectName"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-4 mb-3">
                    <label htmlFor="categoryId" className="form-label">
                        Project Category
                    </label>
                    <select
                        onChange={handleChange}
                        className="form-select"
                        name="categoryId"
                        value={values.categoryId}
                    >
                        {projectCategory.map((item) => {
                            return (
                                <option key={item.id} value={item.id}>
                                    {item.projectCategoryName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <Editor
                        name="description"
                        apiKey="hngjtnxm2rdvc4vl3dlgk44ds8y6fpb9ijo0fsxku53q8f0b"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        value={values.description}
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
            </div>
        </form>
    );
}
const MyEnhancedForm = {
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        console.log(props);
        const { projectEdit } = props;
        const { id, projectName, description, categoryId } = projectEdit;
        return {
            id,
            projectName,
            description,
            categoryId,
        };
    },
    validationSchema: Yup.object().shape({}),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log("values", values);
        const { dispatch } = props;
        // const data = {
        //     projectId: values.id,
        //     categoryId: values.categoryId,
        //     description: values.description,
        //     projectName: values.projectName,
        // };
        // console.log("data", data);
        dispatch(updateProjectAction(values));
    },
    displayName: "FormEditProject",
};

const mapStateToProps = (state) => ({
    projectEdit: state.projectReducer.projectEdit,
});

export default connect(mapStateToProps)(withFormik(MyEnhancedForm)(FormEditProject));
