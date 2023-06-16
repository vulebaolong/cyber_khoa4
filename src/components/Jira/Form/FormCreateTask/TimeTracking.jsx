import { InputNumber, Slider } from "antd";
import { useState } from "react";

function TimeTracking(props) {
    const { onChangeInputRemaining, onChangeInputSpent, onChangeAntd } = props;
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    });

    const handleSpent = (value) => {
        // onChangeInputSpent(value);
        onChangeAntd(value, "timeTrackingSpent");
        setTimeTracking({ ...timeTracking, timeTrackingSpent: +value });
    };
    const handleRemaining = (value) => {
        // onChangeInputRemaining(value);
        onChangeAntd(value, "timeTrackingRemaining");
        setTimeTracking({ ...timeTracking, timeTrackingRemaining: +value });
    };

    return (
        <>
            <label className="form-label">Time Tracking</label>
            <div
                style={{ borderRadius: "0.2rem", padding: "0.2rem 0.5rem" }}
                className={`d-flex align-items-center gap-3`}
            >
                <div className="py-2">
                    <i
                        style={{ fontSize: "1.3rem" }}
                        className="fa-sharp fa-solid fa-stopwatch"
                    ></i>
                </div>
                <div className="" style={{ width: "100%" }}>
                    <div
                        style={{ width: "100%", height: "5px" }}
                        className="progress"
                        role="progressbar"
                    >
                        <div
                            className="progress-bar"
                            style={{
                                width: `${
                                    (+timeTracking.timeTrackingSpent /
                                        (+timeTracking.timeTrackingSpent +
                                            +timeTracking.timeTrackingRemaining)) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <div>{timeTracking.timeTrackingSpent}h logged</div>
                        <div>{timeTracking.timeTrackingRemaining}h estimated</div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6 d-flex flex-column justify-content-between">
                    <label className="form-label">Time spent</label>
                    <InputNumber
                        name="timeTrackingSpent"
                        style={{
                            width: "100%",
                        }}
                        min={1}
                        onChange={handleSpent}
                        placeholder="Number"
                    />
                </div>
                <div className="col-6 d-flex flex-column justify-content-between">
                    <label htmlFor="timeTrackingRemaining" className="form-label">
                        Time remaining
                    </label>
                    <InputNumber
                        name="timeTrackingRemaining"
                        style={{
                            width: "100%",
                        }}
                        min={1}
                        onChange={handleRemaining}
                        placeholder="Number"
                    />
                </div>
            </div>
        </>
    );
}
export default TimeTracking;
