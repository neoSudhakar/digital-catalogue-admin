import React, { useEffect, useState } from "react";
import AssignRetailerForm from "./AssignRetailerForm";
import ModalComponent from "./ModalComponent";
import { useDispatch } from "react-redux";
import { assignRetailerSliceActions } from "../../../store/assignRetailer-slice";
import { useMutation } from "@tanstack/react-query";
import { assignRetailer } from "../../../util/http";
import ErrorBlock from "../../../UI/ErrorBlock";

export default function AssignRetailer({
  cardItem,
  assignRetailersListData,
  isModalOpen,
  onCloseModal,
  edit,
  prevRetailerData,
  refetchAssignedRetailers,
}) {
  const dispatch = useDispatch();

  const {
    mutate,
    data: assignRetailerData,
    isPending: assignRetailerIsPending,
    isError: assignRetailerIsError,
    error: assignRetailerError,
  } = useMutation({
    mutationFn: assignRetailer,
  });

  async function handleAssignRetailerAction(formData) {
    // console.log("formData is :", formData);
    const { retailer, days } = formData;

    let updatedData = {
      designId: cardItem.id,
      retailer: +retailer,
      days: +days,
    };

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
    // console.log("Retailer Assigned Data:",updatedData);

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

  useEffect(() => {
    if (assignRetailerData) {
      // if (edit) {
      //   dispatch(
      //     assignRetailerSliceActions.editAssignDesign({
      //       design: assignRetailerData,
      //       prevRetailerId: prevRetailerData.retailerId,
      //     })
      //   );
      // } else {
      //   dispatch(assignRetailerSliceActions.assignDesign(assignRetailerData));
      // }
      refetchAssignedRetailers();
      
      onCloseModal();
    }

    if(assignRetailerIsError){
      setAssignRetailerErr(true);
    }
  }, [assignRetailerData, assignRetailerIsError]);

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
                assignRetailerError?.info?.message || edit ? "Failed to update assigned retailer!" : "Failed to assign retailer!"
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
