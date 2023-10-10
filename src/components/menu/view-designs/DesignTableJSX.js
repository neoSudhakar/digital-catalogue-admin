import { useState } from "react";
import Button from "../../../UI/Button";
import DesignTable from "./DesignTable";
import classes from "./DesignTableJSX.module.css";
import ModalComponent from "./ModalComponent";
import useInput from "../../../hooks/use-input";

export default function DesignTanbleJSX({ rowDataArr }) {
  const [isModelOpen, setIsModalOpen] = useState(false);

  // const [type, setType] = useState("");
  // const [stoneGroup, setStoneGroup] = useState("");
  // const [pcs, setPcs] = useState("");
  // const [stoneWt, setStoneWt] = useState("");

  const {
    inputVal: type,
    isValid: typeIsValid,
    handleChange: handleTypeChange,
    resetFn: typeResetFn,
    hasErr: typeHasErr,
    handleBlur: handleTypeBlur,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: stoneGroup,
    isValid: stoneGroupIsValid,
    handleChange: handleStoneGroupChange,
    resetFn: stoneGroupResetFn,
    hasErr: stoneGroupHasErr,
    handleBlur: handleStoneGroupBlur,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: pcs,
    isValid: pcsIsValid,
    handleChange: handlePcsChange,
    resetFn: pcsResetFn,
    hasErr: pcsHasErr,
    handleBlur: handlePcsBlur,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: stoneWt,
    isValid: stoneWtIsValid,
    handleChange: handleStoneWtChange,
    resetFn: stoneWtResetFn,
    hasErr: stoneWtHasErr,
    handleBlur: handleStoneWtBlur,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  let isFormValid = false;

  if (typeIsValid && stoneGroupIsValid && pcsIsValid && stoneWtIsValid) {
    isFormValid = true;
  }

  function handleStartAddDesign() {
    setIsModalOpen(true);
  }

  function handleCancelAddDesign() {
    setIsModalOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);

    console.log(formData);

    typeResetFn();
    stoneGroupResetFn();
    pcsResetFn();
    stoneWtResetFn();

    alert("Updated");
    setIsModalOpen(false);
  }

  const cancelStyleObj = {
    backgroundColor: "white",
    color: "blue",
    border: "1px solid blue",
  };
  const saveStyleObj = { backgroundColor: "blue" };

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
        <form className={classes.from} onSubmit={handleSubmit}>
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
        </form>
      </ModalComponent>
    </>
  );
}
