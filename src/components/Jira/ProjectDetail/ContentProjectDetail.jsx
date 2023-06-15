import { useSelector } from "react-redux";
import style from "./ContentProjectDetail.module.css";

function ContentProjectDetail(props) {
    const { projectDetail } = useSelector((state) => state.projectReducer);
    const { lstTask } = projectDetail;
    console.log(lstTask);
    const renderListTask = () => {
        return lstTask.map((task) => {
            return (
                <div key={task.statusId} className="col-3">
                    <div className={`${style.card} card `}>
                        <div className="mb-4">{task.statusName}</div>
                        <ul className="list-group list-group-flush gap-2 border border-0">
                            <li
                                className="list-group-item border border-secondary rounded-2"
                                data-bs-toggle="modal"
                                data-bs-target="#modalMain"
                            >
                                <div className="sc-kPVwWT eYJELZ">
                                    <p className="sc-kfGgVZ duybNU">
                                        This is an issue of type: Task.
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="fa-solid fa-square-check"></i>
                                            <i className="fa-solid fa-arrow-up"></i>
                                        </div>
                                        <div className="rounded-circle">
                                            <img
                                                className="rounded-circle"
                                                src="https://picsum.photos/25"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                className="list-group-item border border-secondary rounded-2"
                                data-bs-toggle="modal"
                                data-bs-target="#modalMain"
                            >
                                <div className="sc-kPVwWT eYJELZ">
                                    <p className="sc-kfGgVZ duybNU">
                                        This is an issue of type: Task.
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="fa-solid fa-square-check"></i>
                                            <i className="fa-solid fa-arrow-up"></i>
                                        </div>
                                        <div className="rounded-circle">
                                            <img
                                                className="rounded-circle"
                                                src="https://picsum.photos/25"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        });
    };
    return (
        <div className="">
            <div className="row">{lstTask && renderListTask()}</div>
        </div>
    );
}
export default ContentProjectDetail;
