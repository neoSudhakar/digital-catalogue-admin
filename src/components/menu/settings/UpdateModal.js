import { Modal } from "antd";
import { Children, useState } from "react";

export default function UpdateModal({children, title, openModal, closeModal}) {
    const [isModalOpen, setIsModalOpen] =useState(false);

    return (
        <Modal
            title={title}
            open={openModal}
            onCancel={closeModal}
            okButtonProps={{style:{display: "none"}}}
            cancelButtonProps={{style: {display: 'none'}}}
            destroyOnClose
        >
            {children}
        </Modal>
    )
};