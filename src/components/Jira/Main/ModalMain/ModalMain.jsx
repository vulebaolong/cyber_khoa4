import style from "./ModalMain.module.css";

function ModalMain() {
    return (
        <div
            className={`${style.modal_box} modal fade`}
            id="modalMain"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="headerleft">
                            <div className={`${style.headeritem}`}>
                                <div className="">
                                    <i className="fa-solid fa-square-check" />
                                </div>
                                <div className="m-0">Task-1151420</div>
                            </div>
                        </div>

                        <div className="headerright d-flex align-items-center gap-2">
                            <div className={`${style.headeritem}`}>
                                <i className="fa-solid fa-paper-plane"></i>
                                <div className="m-0">Give feedback</div>
                            </div>
                            <div className={`${style.headeritem}`}>
                                <i className="fa-solid fa-link"></i>
                                <div className="m-0">Copy link</div>
                            </div>
                            <div className={`${style.headeritem}`}>
                                <div className="">
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            <div
                                className={`${style.headeritem}`}
                                data-bs-dismiss="modal"
                            >
                                <div className="">
                                    <i className="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-8">
                                <textarea
                                    className={`${style.title}`}
                                    placeholder="Short summary"
                                    style={{ height: 48 }}
                                    defaultValue={"This is an issue of type: Task."}
                                />
                                <p>Description</p>
                                <p>
                                    Your teams can collaborate in Jira applications by
                                    breaking down pieces of work into issues. Issues can
                                    represent tasks, software bugs, feature requests or
                                    any other type of project work.
                                </p>
                                <p>Jira Software (software projects) issue types:</p>

                                <p>Bug 🐞</p>
                                <p>
                                    A bug is a problem which impairs or prevents the
                                    functions of a product.
                                </p>

                                <p>Story 📗</p>
                                <p>
                                    A user story is the smallest unit of work that needs
                                    to be done.
                                </p>

                                <p>Task 🗳</p>
                                <p>A task represents work that needs to be done.</p>

                                <p>Comments</p>

                                <div className="comment d-flex gap-3">
                                    <div className="">
                                        <img
                                            className="rounded-circle"
                                            src="https://picsum.photos/35"
                                            alt=""
                                        />
                                    </div>
                                    <div className={`${style.addcomment}`}>
                                        <div className={`${style.comment_write}`}>
                                            Add a comment...
                                        </div>
                                        <div className={`${style.comment_note}`}>
                                            <strong>Pro tip:</strong>press
                                            <span>M</span>to comment
                                        </div>
                                    </div>
                                </div>

                                <div className="issue-comment d-flex gap-3 mt-4">
                                    <div className="">
                                        <img
                                            className="rounded-circle"
                                            src="https://picsum.photos/35"
                                            alt=""
                                        />
                                    </div>
                                    <div className="">
                                        <div className="d-flex gap-2">
                                            <div>Lord Gaben</div>
                                            <div>20 hours ago</div>
                                        </div>

                                        <p className="">
                                            An old silent pond... A frog jumps into the
                                            pond, splash! Silence again.
                                        </p>
                                        <div className="d-flex gap-2">
                                            <div className="">Edit</div>
                                            <div className="">Delete</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="status">
                                    <p>STATUS</p>
                                    <div className={`${style.status_text}`}>
                                        Selected for development
                                    </div>
                                </div>

                                <div className="assigness">
                                    <p>ASSIGNEES</p>
                                    <div className="d-flex align-items-center gap-3">
                                        <div
                                            className={`${style.assigness_item} d-flex align-items-center gap-2`}
                                        >
                                            <div className="d-flex align-items-center justify-content-center">
                                                <img
                                                    className="rounded-circle"
                                                    src="https://picsum.photos/20"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="">Pickle Rick</div>
                                            <div className="">
                                                <i className="fa-solid fa-xmark"></i>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="fa-solid fa-plus"></i>
                                            <div className="">Add more</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="reporter">
                                    <p>REPORTER</p>

                                    <div className="d-flex align-items-center gap-3">
                                        <div
                                            className={`${style.reporter_item} d-flex align-items-center gap-2`}
                                        >
                                            <div className="d-flex align-items-center justify-content-center">
                                                <img
                                                    className="rounded-circle"
                                                    src="https://picsum.photos/20"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="">Pickle Rick</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="priority">
                                    <p>PRIORITY</p>
                                    <select className="form-select">
                                        <option value={1}>Highest</option>
                                        <option value={2}>High</option>
                                        <option value={3}>Low</option>
                                        <option value={4}>Lowest</option>
                                    </select>
                                </div>

                                <div className="original">
                                    <p>ORIGINAL ESTIMATE (HOURS)</p>
                                    <input
                                        type="text"
                                        className={`${style.original_item} form-control`}
                                    />
                                </div>

                                <div className="time">
                                    <p>TIME TRACKING</p>
                                    <div
                                        className={`${style.time_item} d-flex align-items-center gap-3`}
                                    >
                                        <div className="py-2">
                                            <i className="fa-sharp fa-solid fa-stopwatch"></i>
                                        </div>
                                        <div className="" style={{ width: "100%" }}>
                                            <div
                                                style={{ width: "100%", height: "5px" }}
                                                className="progress"
                                                role="progressbar"
                                                aria-valuenow={50}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            >
                                                <div
                                                    className="progress-bar"
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-2">
                                                <div>4h logged</div>
                                                <div>8h estimated</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="createtime">
                                    <div>Created at 21 hours ago</div>
                                    <div>Updated at an hour ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModalMain;
