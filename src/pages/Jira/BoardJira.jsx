import ContentMain from "./../../components/Jira/Main/ContentMain/ContentMain";
import InfoMain from "./../../components/Jira/Main/InfoMain/InfoMain";
import HeaderMain from "./../../components/Jira/Main/Header/HeaderMain";
import Main from "../../components/Jira/Main/Main";

function BoardJira() {
    return (
        <Main>
            <HeaderMain path="Jira Board" title="Jira Board" />
            <InfoMain />
            <ContentMain />
        </Main>
    );
}
export default BoardJira;
