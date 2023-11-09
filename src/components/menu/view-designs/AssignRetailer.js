import React, { useEffect, useState } from 'react'
import AssignRetailerForm from './AssignRetailerForm'
import ModalComponent from './ModalComponent'
import { useDispatch } from 'react-redux'
import { assignRetailerSliceActions } from '../../../store/assignRetailer-slice';

export default function AssignRetailer({cardItem, onAnyUpdateAction, assignRetailersListData, isModalOpen, onCloseModal, edit, prevRetailerData, setMsg}) {
  const dispatch = useDispatch();
  
  async function handleAssignRetailerAction(formData){
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
      accountId: +retailer,
      activeTillDate: +days,
    }

    // console.log("formattedData is: ", formattedDataPOST);

    // console.log("Retailer Assigned Data:",updatedData);

    if(edit){
      const response = await fetch(`http://localhost:8080/api/design-account/accounts/${prevRetailerData.retailerId}/designs/${cardItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify(formattedDataPUT),
      });

      if(response.ok){
        // onAnyUpdateAction(cardItem.id);
        const resData = await response.json();
        console.log("assigned retailer put res data is:",resData);
        setMsg("Put method applied");
      }

      dispatch(assignRetailerSliceActions.editAssignDesign({design: updatedData, prevRetailerId: prevRetailerData.retailerId}));
    }else{
      try{
        const response = await fetch(`http://localhost:8080/api/design-account`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  
          },
          body: JSON.stringify(formattedDataPOST),
        });

        console.log("response is: ", response);

        if(response.ok){
          // onAnyUpdateAction(cardItem.id);
          const resData = await response.json();
          console.log("post res data is:",resData);
          setMsg("Post method applied");
        }
        else{
          // console.log("response status: ", response.status);
          const resData = await response.json();
          console.log("response data is:",resData);
        }
      }
      catch(err){
        console.log("error is:",err);
      }
      

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
            title={"ASSIGN"}
            // onSave={handleUpdateFields}
            style={{ maxWidth: "90%", minWidth: "35%", }}
            // onCancel={handleCancelUpdate}
        >
            <AssignRetailerForm onAction={handleAssignRetailerAction} assignRetailersListData={assignRetailersListData} cardItem={cardItem} onCloseModal={handleCancelAssign} prevRetailerData={prevRetailerData} edit={edit} />
        </ModalComponent>}
    </>
  )
}



