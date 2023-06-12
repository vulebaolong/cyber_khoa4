import HeaderMain from "./../../components/Jira/Main/HeaderMain";
import ContentMain from "./../../components/Jira/Main/ContentMain/ContentMain";
import InfoMain from "./../../components/Jira/Main/InfoMain/InfoMain";

function BoardJira() {
    return (
        <div className="main">
            <HeaderMain path="Jira Board" title="Jira Board" />
            <InfoMain />
            <ContentMain />
        </div>
    );
}
export default BoardJira;
