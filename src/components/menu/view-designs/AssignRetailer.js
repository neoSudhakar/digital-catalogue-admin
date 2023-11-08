import React, { useEffect, useState } from 'react'
import AssignRetailerForm from './AssignRetailerForm'
import ModalComponent from './ModalComponent'
import { useDispatch } from 'react-redux'
import { assignRetailerSliceActions } from '../../../store/assignRetailer-slice';

export default function AssignRetailer({cardItem, isModalOpen, onCloseModal, edit, prevRetailerData}) {
  const dispatch = useDispatch();
  
  function handleAssignRetailerAction(formData){
    // console.log("formData is :", formData);
    const {retailer, days} = formData;

    let updatedData = {
      designId: cardItem.id,
      retailer: +retailer,
      days: +days,
    }

    let formattedDataPOST = {
      designId: cardItem.id,
      accountId: +retailer,
      activeTillDate: +days,
    }

    let formattedDataPUT = {
      activeTillDate: +days,
    }

    // console.log("formattedData is: ", formattedDataPOST);

    // console.log("Retailer Assigned Data:",updatedData);

    if(edit){
      fetch(`http://localhost:8080/api/design-account/accounts/${prevRetailerData.retailerId}/designs/${cardItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify(formattedDataPUT),
      });

      dispatch(assignRetailerSliceActions.editAssignDesign({design: updatedData, prevRetailerId: prevRetailerData.retailerId}));
    }else{
      fetch(`http://localhost:8080/api/design-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify(formattedDataPOST),
      });
      
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
            style={{ maxWidth: "90%", minWidth: "35%", }}
            // onCancel={handleCancelUpdate}
        >
            <AssignRetailerForm onAction={handleAssignRetailerAction} cardItem={cardItem} onCloseModal={handleCancelAssign} prevRetailerData={prevRetailerData} edit={edit} />
        </ModalComponent>}
    </>
  )
}



