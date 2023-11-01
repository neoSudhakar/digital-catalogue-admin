import React, { useEffect, useState } from 'react'
import AssignRetailerForm from './AssignRetailerForm'
import ModalComponent from './ModalComponent'
import { useDispatch } from 'react-redux'
import { assignRetailerSliceActions } from '../../../store/assignRetailer-slice';

export default function AssignRetailer({cardItem, isModalOpen, onCloseModal, edit, prevRetailerData}) {
  const dispatch = useDispatch();
  
  function handleAssignRetailerAction(formData){
    console.log("formData is :", formData);

    let updatedData = {
      designId: cardItem.id,
      ...formData,
    }

    console.log("Retailer Assigned Data:",updatedData);

    if(edit){
      dispatch(assignRetailerSliceActions.editAssignDesign({design: updatedData, prevRetailerId: prevRetailerData.retailerId}));
    }else{
      dispatch(assignRetailerSliceActions.assignDesign(updatedData));
    }
    
  }

  function handleCancelAssign(){
    onCloseModal();
  }

  return (
    <>
        {isModalOpen && <ModalComponent
            isOpen={isModalOpen}
            title={"ASSIGN RETAILER"}
            // onSave={handleUpdateFields}
            style={{ maxWidth: "90%", minWidth: "45%", }}
            // onCancel={handleCancelUpdate}
        >
            <AssignRetailerForm onAction={handleAssignRetailerAction} cardItem={cardItem} onCloseModal={handleCancelAssign} prevRetailerData={prevRetailerData} edit={edit} />
        </ModalComponent>}
    </>
  )
}



