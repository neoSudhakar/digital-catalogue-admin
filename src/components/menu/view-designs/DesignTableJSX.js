import { useEffect, useState } from "react";
import Button from "../../../UI/Button";
import DesignTable from "./DesignTable";
import classes from "./DesignTableJSX.module.css";
import ModalComponent from "./ModalComponent";
import AddDesignTableForm from "./AddDesignTableForm";
import { useMutation } from "@tanstack/react-query";
import { addDesignSet } from "../../../util/http";
import ErrorBlock from "../../../UI/ErrorBlock";

export default function DesignTanbleJSX({ cardItem, onAnyUpdateAction }) {
  // const {detailsSet} = cardItem;
  const [detailsSet, setDetailsSet] = useState(cardItem.detailsSet);
  // console.log(detailsSet);

  const rowDataArr =detailsSet && detailsSet.map((eachItem, index) => {
    const {
      id,
      isActive,
      type,
      stoneGroup,
      pieces,
      stoneWeight,
      unitOfMeasurement,
    } = eachItem;
    return {
      Sno: index + 1,
      id,
      isActive,
      type,
      stoneGroup,
      pieces,
      stoneWeight,
      unitOfMeasurement,
    };
  });

  const [isModelOpen, setIsModalOpen] = useState(false);

  function handleStartAddDesign() {
    setIsModalOpen(true);
  }

  const [addDesignSetErr, setAddDesignSetErr] = useState(false);

  function handleCancelAddDesign() {
    setIsModalOpen(false);
    setAddDesignSetErr(false);
  }

  const {
    mutate,
    data: addDesignSetData,
    isPending: addDesignSetIsPending,
    isError: addDesignSetIsError,
    error: addDesignSetError,
  } = useMutation({
    mutationFn: addDesignSet,
    onSuccess: (addDesignSetData)=>{
      setDetailsSet((prev) => [...prev, addDesignSetData]);
      setIsModalOpen(false);
    },
    onError: ()=>{
      setAddDesignSetErr(true);
    }
  });

  async function handleADDAction(addedData) {
    // console.log("AddedData", addedData);
    mutate({ addedData: addedData, cardItemId: cardItem.id });
  }

  // useEffect(() => {
  //   if (addDesignSetData) {
  //     setDetailsSet((prev) => [...prev, addDesignSetData]);
  //     setIsModalOpen(false);
  //   }
  //   if (addDesignSetIsError) {
  //     setAddDesignSetErr(true);
  //   }
  // }, [addDesignSetData, addDesignSetIsError]);

  return (
    <>
      <div className={classes["add-design"]}>
        <button className={classes.button} onClick={handleStartAddDesign}>
          Add Description
        </button>
      </div>
      <div className={classes.table}>
        <DesignTable
          key={detailsSet}
          setDetailsSet={setDetailsSet}
          rowDataArr={rowDataArr}
          cardItem={cardItem}
          onAnyUpdateAction={onAnyUpdateAction}
        />
      </div>

      {isModelOpen && (
        <ModalComponent
          title="ADD DESCRIPTION"
          isOpen={isModelOpen}
          style={{ minWidth: "45%", maxWidth: "90%" }}
        >
          {addDesignSetErr && !addDesignSetIsPending && (
            <ErrorBlock
              title="Error occurred!"
              message={
                addDesignSetError?.info?.errorMessage ||
                "Failed to add design set!"
              }
            />
          )}
          <AddDesignTableForm
            designSetData={addDesignSetData}
            designSetErr={addDesignSetErr}
            designSetIsPending={addDesignSetIsPending}
            onCloseModal={handleCancelAddDesign}
            onAction={handleADDAction}
          />
        </ModalComponent>
      )}
    </>
  );
}
