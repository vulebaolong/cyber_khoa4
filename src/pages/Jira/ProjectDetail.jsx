import { useDispatch, useSelector } from "react-redux";
import ContentMain from "../../components/Jira/Main/ContentMain/ContentMain";
import HeaderMain from "../../components/Jira/Main/Header/HeaderMain";
import InfoMain from "../../components/Jira/Main/InfoMain/InfoMain";
import Main from "../../components/Jira/Main/Main";
import ContentProjectDetail from "../../components/Jira/ProjectDetail/ContentProjectDetail";
import { useEffect } from "react";
import { getOneProjectAction } from "../../redux/actions/jiraAction";

function ProjectDetail(props) {
    const { params } = props.match;
    // console.log(props);
    const { projectDetail } = useSelector((state) => state.projectReducer);
    // console.log(projectDetail);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneProjectAction(params.id));
    }, []);

    return (
        <Main>
            <HeaderMain path="ProjectDetail" title={projectDetail.projectName} />
            <InfoMain />
            <ContentProjectDetail />
        </Main>
    );
}
export default ProjectDetail;
