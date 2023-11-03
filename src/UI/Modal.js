import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDom from "react-dom";

const portalModalId=document.getElementById("modal");

const BackdropComponent=(props)=>{
    return(
        <div className={classes["back-drop"]} onClick={props.onClick}></div>
    );
};

const ModalComponent=(props)=>{
    return (
        <div className={classes.modal}>{props.children}</div>
    );
};

const Modal=(props)=>{
    return(
        <Fragment>
            {ReactDom.createPortal(<BackdropComponent onClick={props.onClose} />,portalModalId)}
            {ReactDom.createPortal(<ModalComponent>{props.children}</ModalComponent>,portalModalId)}
        </Fragment>
    );
};
export default Modal;