import { Slider } from "antd";
import { useState } from "react";

function TimeTracking() {
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    });

    const handleTimeTrackingSpent = (e) => {
        setTimeTracking({ ...timeTracking, timeTrackingSpent: +e.target.value });
    };
    const timeTrackingRemaining = (e) => {
        setTimeTracking({ ...timeTracking, timeTrackingRemaining: +e.target.value });
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
                        style={{ fontSize: "1.4rem" }}
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
                <div className="col-6">
                    <div className="">
                        <label htmlFor="timeTrackingSpent" className="form-label">
                            Time spent
                        </label>
                        <input
                            name="timeTrackingSpent"
                            type="number"
                            className="form-control"
                            id="timeTrackingSpent"
                            placeholder="Number"
                            min={0}
                            onChange={(e) => {
                                handleTimeTrackingSpent(e);
                            }}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="">
                        <label htmlFor="timeTrackingRemaining" className="form-label">
                            Time remaining
                        </label>
                        <input
                            name="timeTrackingRemaining"
                            type="number"
                            className="form-control"
                            id="timeTrackingRemaining"
                            placeholder="Number"
                            min={0}
                            onChange={(e) => {
                                timeTrackingRemaining(e);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
        // <>
        //     <label className="form-label">Time Tracking</label>
        //     <Slider
        //         defaultValue={0}
        //         disabled={true}
        //         value={+timeTracking.timeTrackingSpent}
        //         max={
        //             +timeTracking.timeTrackingSpent + +timeTracking.timeTrackingRemaining
        //         }
        //     />
        // <div className="row mt-3">
        //     <div className="col-6">
        //         <div className="">
        //             <label htmlFor="timeTrackingSpent" className="form-label">
        //                 Time spent
        //             </label>
        //             <input
        //                 name="timeTrackingSpent"
        //                 type="number"
        //                 className="form-control"
        //                 id="timeTrackingSpent"
        //                 placeholder="Number"
        //                 min={0}
        //                 onChange={(e) => {
        //                     handleTimeTrackingSpent(e);
        //                 }}
        //             />
        //         </div>
        //     </div>
        //     <div className="col-6">
        //         <div className="">
        //             <label htmlFor="timeTrackingRemaining" className="form-label">
        //                 Time remaining
        //             </label>
        //             <input
        //                 name="timeTrackingRemaining"
        //                 type="number"
        //                 className="form-control"
        //                 id="timeTrackingRemaining"
        //                 placeholder="Number"
        //                 min={0}
        //                 onChange={(e) => {
        //                     timeTrackingRemaining(e);
        //                 }}
        //             />
        //         </div>
        //     </div>
        // </div>
        // </>
    );
}
export default TimeTracking;
