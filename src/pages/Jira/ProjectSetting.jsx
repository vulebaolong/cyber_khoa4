import HeaderMain from "../../components/Jira/Main/HeaderMain";
import ContentProjectSetting from "../../components/Jira/ProjectSetting/ContentProjectSetting";

function ProjectSetting() {
    return (
        <div className="main">
            <div className="d-flex justify-content-center">
                <div
                    className="projectsetting"
                    style={{ maxWidth: "740px", width: "100%" }}
                >
                    <HeaderMain path="Project Details" title="Project Details" />
                    <ContentProjectSetting />
                </div>
            </div>
        </div>
    );
}
export default ProjectSetting;
