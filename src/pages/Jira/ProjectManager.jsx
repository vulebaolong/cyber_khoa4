import ContentProjectManager from "./../../components/Jira/ProjectManager/ContentProjectManager";
import HeaderMain from "./../../components/Jira/Main/Header/HeaderMain";
import Main from "../../components/Jira/Main/Main";

function ProjectManager() {
    return (
        <Main>
            <HeaderMain path="ProjectManager" title="Project Manager" />
            <ContentProjectManager />
        </Main>
    );
}
export default ProjectManager;
