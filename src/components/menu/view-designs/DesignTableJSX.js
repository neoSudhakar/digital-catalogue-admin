import { useState } from "react";
import Button from "../../../UI/Button";
import DesignTable from "./DesignTable";
import classes from "./DesignTableJSX.module.css";
import ModalComponent from "./ModalComponent";
import AddDesignTableForm from "./AddDesignTableForm";

export default function DesignTanbleJSX({ cardItem}) {
    const {detailsSet} = cardItem;
    console.log(detailsSet);

    const rowDataArr= detailsSet.map((eachItem, index)=>{
      const {id, isActive, type, stoneGroup, pieces, stoneWeight, unitOfMeasurement} = eachItem;
      return {
        "Sno": index+1,
        id,
        isActive,
        type,
        stoneGroup,
        pieces,
        stoneWeight,
        unitOfMeasurement,
      }
    })

    const [isModelOpen, setIsModalOpen] = useState(false);

  function handleStartAddDesign() {
    setIsModalOpen(true);
  }

  function handleCancelAddDesign() {
    setIsModalOpen(false);
  }

  function handleADDAction(addedData){
    console.log("AddedData", addedData);
    fetch(`http://localhost:8080/api/designs/${cardItem.id}/details`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedData),
      // body: addedData,
    });
  }


  return (
    <>
      <div className={classes["add-design"]}>
        <button className={classes.button} onClick={handleStartAddDesign}>Add Description</button>
      </div>
      <div className={classes.table}>
        <DesignTable key={detailsSet} rowDataArr={rowDataArr} cardItem={cardItem} />
      </div>

      {isModelOpen && <ModalComponent
        title="ADD DESCRIPTION"
        isOpen={isModelOpen}
        style={{ minWidth: "45%", maxWidth: "90%" }}
      >
        <AddDesignTableForm onCloseModal={handleCancelAddDesign} onAction={handleADDAction} />
      </ModalComponent>}
    </>
  );
}
