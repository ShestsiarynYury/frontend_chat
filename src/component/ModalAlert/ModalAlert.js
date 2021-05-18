import ReactDOM from "react-dom";
import "./ModalAlert.css";

const ModalAlert = (props) => {

    return (
        ReactDOM.createPortal(
            <div className="modal" style={props.hidden ? {display: "none"} : {display: "block"}}>
            <div className="modal-header">
                <span>{props.name}</span>
                <span className="close-btn" 
                    onClick={
                        ()=> {
                            // очищаем модальное окно
                            props.close();
                        }
                    }>
                    &times;
                </span>
            </div>
            <div className="modal-content">
                {props.message}
            </div>
            <div className="modal-footer">
            </div>
        </div>, document.body)
    );
};

export default ModalAlert;