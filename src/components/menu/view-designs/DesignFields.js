import { useEffect, useState } from "react";
import classes from "./DesignFields.module.css";
import ModalComponent from "./ModalComponent";
import UpdateFieldsForm from "./UpdateFieldsForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AssignRetailer from "./AssignRetailer";
import ErrorBlock from "../../../UI/ErrorBlock";
import LoadingIndicator from "../../../UI/LoadingIndicator";
import { useMutation } from "@tanstack/react-query";
import { queryClientObj, removeRetailer, updateDesignFields } from "../../../util/http";
import ErrorModal from "./ErrorModal";

export default function DesignFields({
  cardItem1,
  onAnyUpdateAction,
  assignRetailersListData,
  isPending,
  isError,
  error,
  refetchAssignedRetailers,
}) {
  const [cardItem, setCardItem] = useState(cardItem1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const RETAILERS = useSelector((state) => state.assignRetailer.retailers);

  function handleStartUpdateFields() {
    setIsModalOpen(true);
  }

  function handleCancelUpdate() {
    setIsModalOpen(false);
  }

  const {
    mutate,
    data: updateDesignFieldsData,
    isPending: updateDesignFieldsIsPending,
    isError: updateDesignFieldsIsError,
    error: updateDesignFieldsError,
  } = useMutation({
    mutationFn: updateDesignFields,
  });

  useEffect(() => {
    if (updateDesignFieldsData) {
      setCardItem(updateDesignFieldsData);
      handleCancelUpdate();
    }
  }, [updateDesignFieldsData]);

  async function handleUpdateAction(updatedData) {
    mutate({ updatedData: updatedData, cardItemId: cardItem.id });
  }

  function getRetailerName(id) {
    // console.log("id is " + id);
    // console.log("type of id is ", typeof id);

    const retailerObj = RETAILERS.find((eachObj) => {
      // console.log(eachObj);
      return eachObj.id === id;
    });
    // console.log("Retailer Object : ", retailerObj);
    return retailerObj.name;
  }

  const [isEditAssignModalOpen, setIsEditAssignModalOpen] = useState(false);
  const [prevRetailerData, setPrevRetailerData] = useState();

  function handleStartEditAssign(retailerData) {
    setPrevRetailerData(retailerData);
    setIsEditAssignModalOpen(true);
  }

  function handleCancelEditAssign() {
    setIsEditAssignModalOpen(false);
  }

  const [errModalIsOpen, setErrModalIsOpen] = useState(false);
  // const [removeRetailerErr, setRemoveRetailerErr] = useState(false);

  function handleCloseErrModal(){
    setErrModalIsOpen(false);
  }

  const {mutate: removeRetailerMutate, error: removeRetailerError, isPending: removeRetailerIsPending} = useMutation({
    mutationFn: removeRetailer,
    onSuccess: ()=>{
      setRemovingRetailerId(null);
    },
    onError: ()=>{
      // setRemoveRetailerErr(true);
      console.log("removeRetailer failed");
      setErrModalIsOpen(true);
    },
    onSettled: ()=>{
      queryClientObj.invalidateQueries({
        queryKey: ["assignedRetailers"],
      })
    }
  })

  const [removingRetailerId, setRemovingRetailerId] = useState(null);

  async function handleRemoveAssign(retailerData) {
    // const confirm = window.confirm("Are you sure you want to remove retailer?");
    setRemovingRetailerId(retailerData.id);
    // if(confirm){
      removeRetailerMutate(retailerData.id);
    // }
  }

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="Error occured!"
        message={error.info?.message || "Failed to fetch assigned retailers!"}
      />
    );
  }

  let content2;
  if(errModalIsOpen){
    content2 = (
      <ErrorModal errModalIsOpen={errModalIsOpen} err={removeRetailerError} onCloseErrModal={handleCloseErrModal} fallBackErrMsg="Failed to remove assigned retailer!" />
    )
  }

  if (assignRetailersListData.length > 0) {
    content = (
      <ul className={classes["assigned-retailers"]}>
        {assignRetailersListData.map((retailerData) => {
          return (
            <li key={retailerData.id} className={classes["assigned-retailer"]}>
              <p>
                <span>Assigned Retailer : </span>
                {getRetailerName(retailerData.retailerId)}
              </p>
              <p>
                <span>Active Days : </span>
                {retailerData.activeTillDate}
              </p>
              <div className={classes["assign-actions"]}>
                {/* {removingRetailerId!==retailerData.id && !removeRetailerIsPending && ( */}
                  <>
                    <button
                      className={classes["edit-assign"]}
                      onClick={() => handleStartEditAssign(retailerData)}
                    >
                      Edit
                    </button>
                    <button
                      className={classes["remove-assign"]}
                      onClick={() => handleRemoveAssign(retailerData)}
                    >
                      Remove
                    </button>
                  </>
                {/* )} */}
                {/* {removeRetailerIsPending && removingRetailerId===retailerData.id && <p>Removing...</p>} */}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <section className={classes.content}>
        {content}
        {content2}

        {isEditAssignModalOpen && (
          <AssignRetailer
            refetchAssignedRetailers={refetchAssignedRetailers}
            onAnyUpdateAction={onAnyUpdateAction}
            cardItem={cardItem}
            assignRetailersListData={assignRetailersListData}
            isModalOpen={isEditAssignModalOpen}
            onCloseModal={handleCancelEditAssign}
            edit
            prevRetailerData={prevRetailerData}
          />
        )}

        <button
          className={classes["update-fields"]}
          onClick={handleStartUpdateFields}
        >
          Update
        </button>
        <div className={classes["cardItem-details"]}>
          <div>
            <span>Design No.: </span>
            <p>{cardItem.designNumber}</p>
          </div>
          <div>
            <span>Mian Group: </span>
            <p>{cardItem.mainGroup}</p>
          </div>
          <div>
            <span>Category: </span>
            <p>{cardItem.category}</p>
          </div>
          <div>
            <span>Created Date: </span>
            <p>{cardItem.createdDate.slice(0, 10)}</p>
          </div>
          <div>
            <span>Style: </span>
            <p>{cardItem.style}</p>
          </div>
          <div>
            <span>Product: </span>
            <p>{cardItem.product}</p>
          </div>
          <div>
            <span>Model: </span>
            <p>{cardItem.model}</p>
          </div>
          <div>
            <span>Size: </span>
            <p>{cardItem.size}</p>
          </div>
          <div>
            <span>Worker: </span>
            <p>{cardItem.worker}</p>
          </div>
          <div>
            <span>Pieces: </span>
            <p>{cardItem.pieces}</p>
          </div>
          <div>
            <span>Gross Weight: </span>
            <p>{cardItem.grossWeight} grms</p>
          </div>
          <div>
            <span>Stone Weight: </span>
            <p>{cardItem.stoneWeight} grms</p>
          </div>
          <div>
            <span>Net Weight: </span>
            <p>{cardItem.netWeight} grms</p>
          </div>
          <div>
            <span>Component Weight: </span>
            <p>{cardItem.componentWeight} grms</p>
          </div>
          <div>
            <span>Ghat Weight: </span>
            <p>{cardItem.ghatWt} grms</p>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          title={"UPDATE DESIGN"}
          // onSave={handleUpdateFields}
          style={{ maxWidth: "90%", minWidth: "80%" }}
          // onCancel={handleCancelUpdate}
        >
          {updateDesignFieldsIsError && (
            <div className={classes["error-block"]}>
            <ErrorBlock
              title={"Error Occured!"}
              message={
                updateDesignFieldsError.info?.message ||
                "Failed to update design fields!"
              }
            />
            </div>
          )}

          <UpdateFieldsForm
            onAction={handleUpdateAction}
            updateDesignFieldsIsPending={updateDesignFieldsIsPending}
            updateDesignFieldsIsError={updateDesignFieldsIsError}
            updateDesignFieldsError={updateDesignFieldsError}
            cardItem={cardItem}
            onCloseModal={handleCancelUpdate}
          />
        </ModalComponent>
      )}
      {/* {content2} */}
    </>
  );
}
