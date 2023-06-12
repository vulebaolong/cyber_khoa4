import style from "./InfoMain.module.css";

function InfoMain() {
    return (
        <div className={`${style.info} my-5`}>
            <div className={`${style.input_search} input-group`}>
                <span className="input-group-text" id="icon_search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-describedby="icon_search"
                />
            </div>

            <div className={`${style.avatar}`}>
                <button className="avatar_button" data-bs-toggle="button">
                    <img
                        className="rounded-circle"
                        src="https://picsum.photos/40"
                        alt=""
                    />
                </button>
                <button className="avatar_button" data-bs-toggle="button">
                    <img
                        className="rounded-circle"
                        src="https://picsum.photos/40"
                        alt=""
                    />
                </button>
                <button className="avatar_button" data-bs-toggle="button">
                    <img
                        className="rounded-circle"
                        src="https://picsum.photos/40"
                        alt=""
                    />
                </button>
            </div>

            <button type="button" className="btn btn-outline-secondary">
                Only My Issues
            </button>
            <button type="button" className="btn btn-outline-secondary">
                Recently Updated
            </button>
        </div>
    );
}
export default InfoMain;
