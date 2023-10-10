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
        <Button onClick={handleStartAddDesign}>Add Design</Button>
      </div>
      <div className={classes.table}>
        <DesignTable rowDataArr={rowDataArr} />
      </div>

      <ModalComponent
        title="ADD DESIGN"
        isOpen={isModelOpen}
        style={{ minWidth: "50%", maxWidth: "90%" }}
      >
        {/* <form className={classes.from} onSubmit={handleSubmit}>
          <div className={classes["input-grp"]}>
            <label htmlFor="Type">Type</label>
            <input
              id="Type"
              name="Type"
              type="text"
              value={type}
              onChange={handleTypeChange}
              defaultValue={""}
            />
          </div>
          <div className={classes["input-grp"]}>
            <label htmlFor="Stone Group">Stone Group</label>
            <input
              id="Stone Group"
              name="Stone Group"
              value={stoneGroup}
              type="text"
              onChange={handleStoneGroupChange}
              defaultValue={""}
            />
          </div>
          <div className={classes["input-grp"]}>
            <label htmlFor="Pcs">Pcs</label>
            <input
              id="Pcs"
              name="Pcs"
              type="number"
              value={pcs}
              onChange={handlePcsChange}
              defaultValue={""}
            />
          </div>
          <div className={classes["input-grp"]}>
            <label htmlFor="Stone Wt">Stone Wt</label>
            <input
              id="Stone Wt"
              name="Stone Wt"
              type="number"
              value={stoneWt}
              onChange={handleStoneWtChange}
              defaultValue={""}
            />
          </div>
          <div className={classes.actions}>
            <div>
              <Button
                key="back"
                type="button"
                style={cancelStyleObj}
                onClick={handleCancelAddDesign}
              >
                Cancel
              </Button>
              <Button
                key="submit"
                style={saveStyleObj}
                disabled={!isFormValid}
                type="submit"
              >
                Update
              </Button>
            </div>
          </div>
        </form> */}
        <AddDesignTableForm onCloseModal={handleCancelAddDesign} onAction={handleADDAction} />
      </ModalComponent>
    </>
  );
}
