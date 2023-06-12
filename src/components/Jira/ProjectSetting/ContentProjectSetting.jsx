import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { projectCategoryAction } from "../../../redux/actions/jiraAction";

function ContentProjectSetting() {
    const editorRef = useRef(null);
    const projectCategory = useSelector(
        (state) => state.projectCategoryReducer.projectCategory
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(projectCategoryAction());
    }, []);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="projectName" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="projectName"
                    id="projectName"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                    Description
                </label>
                <Editor
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
                        log();
                    }}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">
                    Project Category
                </label>

                <select className="form-select" name="categoryId">
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
export default ContentProjectSetting;
