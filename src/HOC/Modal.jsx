import { useSelector } from "react-redux";

function Modal() {
    const { ComponentContentModal } = useSelector((state) => state.modalReducer);
    return (
        <div
            className="modal fade"
            id="modalMain"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">{ComponentContentModal}</div>
            </div>
        </div>
    );
}
export default Modal;
