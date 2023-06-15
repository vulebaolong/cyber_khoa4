import Main from "../../components/Jira/Main/Main";
import HeaderMain from "../../components/Jira/Main/Header/HeaderMain";
import ContentProjectCreate from "../../components/Jira/ProjectCreate/ContentProjectCreate";

function ProjectCreate() {
    return (
        <Main>
            <div className="d-flex justify-content-center">
                <div
                    className="projectsetting"
                    style={{ maxWidth: "740px", width: "100%" }}
                >
                    <HeaderMain path="ProjectCreate" title="Project Create" />
                    <ContentProjectCreate />
                </div>
            </div>
        </Main>
    );
}
export default ProjectCreate;
