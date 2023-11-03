
import Button from "../../../UI/Button";
import useInputSpcl from "../../../hooks/use-input-spcl";
import classes from "./AddDesignTableForm.module.css";

export default function AddDesignTableForm({onCloseModal, formData, onAction}){
    // console.log("Hello",formData);

    const initialTypeVal= formData ? formData.type : "";
    const initialStoneGroupVal= formData ? formData.stoneGroup : "";
    const initialPiecesVal= formData ? formData.pieces : "";
    const initialStoneWtVal= formData ? formData.stoneWeight: "";

    const {
    inputVal: type,
    isValid: typeIsValid,
    handleChange: handleTypeChange,
    resetFn: typeResetFn,
    hasErr: typeHasErr,
    touchFn: typeTouchFn,
    handleBlur: handleTypeBlur,
    } = useInputSpcl((inputValue) => inputValue, initialTypeVal );

    const {
    inputVal: stoneGroup,
    isValid: stoneGroupIsValid,
    handleChange: handleStoneGroupChange,
    resetFn: stoneGroupResetFn,
    touchFn: stoneGroupTouchFn,
    hasErr: stoneGroupHasErr,
    handleBlur: handleStoneGroupBlur,
    } = useInputSpcl((inputValue) => inputValue, initialStoneGroupVal);

    const {
    inputVal: pcs,
    isValid: pcsIsValid,
    handleChange: handlePcsChange,
    resetFn: pcsResetFn,
    hasErr: pcsHasErr,
    touchFn: pcsTouchFn,
    handleBlur: handlePcsBlur,
    } = useInputSpcl((inputValue) => inputValue, initialPiecesVal);

    const {
    inputVal: stoneWt,
    isValid: stoneWtIsValid,
    handleChange: handleStoneWtChange,
    resetFn: stoneWtResetFn,
    hasErr: stoneWtHasErr,
    touchFn: stoneWtTouchFn,
    handleBlur: handleStoneWtBlur,
    } = useInputSpcl((inputValue) => inputValue, initialStoneWtVal);

    let isFormValid = false;

    if (typeIsValid && stoneGroupIsValid && pcsIsValid && stoneWtIsValid) {
    isFormValid = true;
    }


    function handleSubmit(event) {
        event.preventDefault();
    
        if (!isFormValid) {
          return;
        }
    
        const form = new FormData(event.target);
        const fd = Object.fromEntries(form);
        
        onAction(fd);

        typeResetFn();
        stoneGroupResetFn();
        pcsResetFn();
        stoneWtResetFn();

        onCloseModal();
    
        alert("Updated");
        
      }


      const cancelStyleObj = {
        backgroundColor: "white",
        color: "blue",
        border: "1px solid blue",
      };
      const saveStyleObj = { backgroundColor: "blue" };

    return <form className={classes.from} onSubmit={handleSubmit}>
            <div className={`${classes["input-grp"]} ${classes["input-grp-first"]}`}>
                <label htmlFor="type">Type</label>
                {/* <input
                    id="type"
                    name="type"
                    type="text"
                    value={type}
                    onChange={handleTypeChange}
                /> */}
                <select name="type" id="type" onChange={handleTypeChange} defaultValue={type} >
                    {!formData && <option value="" disabled hidden>
                        Select an option
                      </option>}
                    <option value="Stone">Stone</option>
                    <option value="Composite">Composite</option>
                </select>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="stoneGroup">Stone Group</label>
                {/* <input
                    id="stoneGroup"
                    name="stoneGroup"
                    value={stoneGroup}
                    type="text"
                    onChange={handleStoneGroupChange}
                /> */}
                <select name="stoneGroup" id="stoneGroup" onChange={handleStoneGroupChange} defaultValue={stoneGroup} >
                    {!formData && <option value="" disabled hidden>
                        Select an option
                      </option>}
                    <option value="StoneGroup1">StoneGroup1</option>
                    <option value="StoneGroup2">StoneGroup2</option>
                    <option value="StoneGroup3">StoneGroup3</option>
                </select>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="pieces">Pcs</label>
                <input
                    id="pieces"
                    name="pieces"
                    type="number"
                    value={pcs}
                    onChange={handlePcsChange}
                />
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="stoneWeight">Stone Wt</label>
                <input
                    id="stoneWeight"
                    name="stoneWeight"
                    type="number"
                    value={stoneWt}
                    onChange={handleStoneWtChange}
                />
            </div>
            <div className={classes.actions}>
                <div>
                    <Button
                    type="button"
                    style={cancelStyleObj}
                    onClick={onCloseModal}
                    >
                    Cancel
                    </Button>
                    <Button
                    style={saveStyleObj}
                    disabled={!isFormValid}
                    type="submit"
                    >
                    {formData ? "Update" : "Add"}
                    </Button>
                </div>
            </div>
        </form>
}