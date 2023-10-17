import { useState } from "react";
import Button from "../../../UI/Button";
import DesignTable from "./DesignTable";
import classes from "./DesignTableJSX.module.css";
import ModalComponent from "./ModalComponent";
import AddDesignTableForm from "./AddDesignTableForm";

export default function DesignTanbleJSX({ cardItem}) {
    const {detailsSet} = cardItem;

    const rowDataArr= detailsSet.map((eachItem, index)=>{
      const {type, stoneGroup, pieces, stoneWeight, unitOfMeasurement} = eachItem;
      return {
        "Sno": index+1,
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
  }


  return (
    <>
      <div className={classes["add-design"]}>
        <button className={classes.button} onClick={handleStartAddDesign}>Add Description</button>
      </div>
      <div className={classes.table}>
        <DesignTable rowDataArr={rowDataArr} />
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
