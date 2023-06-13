import Main from "../../components/Jira/Main/Main";
import ContentProjectSetting from "../../components/Jira/ProjectSetting/ContentProjectSetting";
import HeaderMain from "./../../components/Jira/Main/Header/HeaderMain";

function ProjectSetting() {
    return (
        <Main>
            <div className="d-flex justify-content-center">
                <div
                    className="projectsetting"
                    style={{ maxWidth: "740px", width: "100%" }}
                >
                    <HeaderMain path="Project Details" title="Project Details" />
                    <ContentProjectSetting />
                </div>
            </div>
        </Main>
    );
}
export default ProjectSetting;
