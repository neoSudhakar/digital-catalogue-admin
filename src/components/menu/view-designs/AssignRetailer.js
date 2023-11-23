import React, { useEffect, useState } from "react";
import AssignRetailerForm from "./AssignRetailerForm";
import ModalComponent from "./ModalComponent";
import { useMutation } from "@tanstack/react-query";
import { assignRetailer, queryClientObj } from "../../../util/http";
import ErrorBlock from "../../../UI/ErrorBlock";

export default function AssignRetailer({
  cardItem,
  assignRetailersListData,
  isModalOpen,
  onCloseModal,
  edit,
  prevRetailerData,
}) {

  const {
    mutate,
    data: assignRetailerData,
    isPending: assignRetailerIsPending,
    isError: assignRetailerIsError,
    error: assignRetailerError,
  } = useMutation({
    mutationFn: assignRetailer,
    onSuccess : ()=>{
            queryClientObj.invalidateQueries({
              queryKey: ["assignedRetailers"] // we can see this key inside DesignDetails.js
            });
            onCloseModal();
    },

    onError : ()=>{
            setAssignRetailerErr(true);
    }
  });

  async function handleAssignRetailerAction(formData) {
    // console.log("formData is :", formData);
    const { retailer, days } = formData;

    let formattedDataPOST = {
      designId: cardItem.id,
      accountId: +retailer,
      activeTillDate: +days,
    };

    let formattedDataPUT = {
      accountId: +retailer,
      activeTillDate: +days,
    };

    // console.log("formattedData is: ", formattedDataPOST);

    if (edit) {
      mutate({
        cardItemId: cardItem.id,
        formattedData: formattedDataPUT,
        edit: true,
        prevRetailerId: prevRetailerData.retailerId,
      });
    } else {
      mutate({
        cardItemId: cardItem.id,
        formattedData: formattedDataPOST,
        edit: false,
      });
    }
  }

  const [assignRetailerErr, setAssignRetailerErr] = useState(false);

  function handleCancelAssign() {
    onCloseModal();
    setAssignRetailerErr(false);
  }

  return (
    <>
      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          title={"ASSIGN"}
          style={{ maxWidth: "90%", minWidth: "35%" }}
        >
          {assignRetailerErr && !assignRetailerIsPending && (
            <ErrorBlock
              title="Error occurred!"
              message={
                assignRetailerError?.info?.errorMessage || edit ? "Failed to update assigned retailer!" : "Failed to assign retailer!"
              }
            />
          )}
          <AssignRetailerForm
            onAction={handleAssignRetailerAction}
            isPending={assignRetailerIsPending}
            assignRetailersListData={assignRetailersListData}
            cardItem={cardItem}
            onCloseModal={handleCancelAssign}
            prevRetailerData={prevRetailerData}
            edit={edit}
          />
        </ModalComponent>
      )}
    </>
  );
}
