import React from 'react'
import ModalComponent from './ModalComponent'
import AssignRetailerForm from './AssignRetailerForm'
import ErrorBlock from '../../../UI/ErrorBlock'

export default function ErrorModal({errModalIsOpen, err, onCloseErrModal}) {
  return (
    <ModalComponent
          isOpen={errModalIsOpen}
          title={""}
          // onSave={handleUpdateFields}
          style={{ maxWidth: "90%", minWidth: "35%" }}
          // onCancel={handleCancelUpdate}
        >
          <ErrorBlock
            title={"Error Occured!"}
            message={
                err?.info?.errorMessage ||
              "Failed to remove assigned retailer!"
            }
          />

          <AssignRetailerForm isErrorBlock onCloseErrModal={onCloseErrModal} />
            
        </ModalComponent>
  )
}