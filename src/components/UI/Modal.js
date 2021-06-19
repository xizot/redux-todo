import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackDrop = ({ onClose }) => {
    return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlayer");

const Modal = ({ children, onClose }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <BackDrop onClose={onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay children={children} />,
                portalElement
            )}
        </>
    );
};
export default Modal;
