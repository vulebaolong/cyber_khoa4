import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    createProjectAction,
    projectCategoryAction,
} from "../../../redux/actions/jiraAction";
import { withFormik } from "formik";
import * as Yup from "yup";

function ContentProjectCreate(props) {
    const editorRef = useRef(null);
    const projectCategory = useSelector(
        (state) => state.projectCategoryReducer.projectCategory
    );
    const { handleChange, handleSubmit, setFieldValue } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(projectCategoryAction());
    }, [dispatch]);

    const handleEditorChange = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            setFieldValue("description", editorRef.current.getContent());
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="projectName" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="projectName"
                    id="projectName"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <Editor
                    name="description"
                    apiKey="hngjtnxm2rdvc4vl3dlgk44ds8y6fpb9ijo0fsxku53q8f0b"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue=""
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
                    onEditorChange={() => {
                        handleEditorChange();
                    }}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">
                    Project Category
                </label>

                <select onChange={handleChange} className="form-select" name="categoryId">
                    {projectCategory.map((item) => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.projectCategoryName}
                            </option>
                        );
                    })}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Create Project
            </button>
        </form>
    );
}
const MyEnhancedForm = {
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectCategory } = props;
        return {
            projectName: "",
            description: "",
            categoryId: projectCategory[0]?.id,
        };
    },
    validationSchema: Yup.object().shape({}),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log(values);
        const { dispatch } = props;
        dispatch(createProjectAction(values));
    },
    displayName: "ContentProjectCreate",
};
const mapStateToProps = (state) => ({
    projectCategory: state.projectCategoryReducer.projectCategory,
});

export default connect(mapStateToProps)(withFormik(MyEnhancedForm)(ContentProjectCreate));
