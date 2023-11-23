import React from 'react';
import { Modal } from 'antd';
import classes from "./ModalComponent.module.css";

const ModalComponent = ({children, isOpen, style, title}) => {

  return (
    <>
      <Modal
        open={isOpen}
        // title="Title"
        closable={false}
        title={title}
        // onOk={onSave}
        // onCancel={onCancel}
        // width={"50vw"}
        className={classes.modal}
        style={{...style, marginTop: "-2.5rem"}}
        footer={[]}
      >
        {children}
      </Modal>
    </>
  );
};
export default ModalComponent;