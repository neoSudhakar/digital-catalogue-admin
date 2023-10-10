import Button from "../../../UI/Button";
import classes from "./AddDesignTableForm.module.css";

export default function UpdateTableForm({formData, onCloseModal}){
    function handleSubmit(event) {
        event.preventDefault();
    
        const form = new FormData(event.target);
        const fd = Object.fromEntries(form);
    
        console.log(fd);

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
            <div className={classes["input-grp"]}>
                <label htmlFor="type">Type</label>
                <input
                    id="type"
                    name="type"
                    type="text"
                    defaultValue={formData.type}
                />
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="stoneGroup">Stone Group</label>
                <input
                    id="stoneGroup"
                    name="stoneGroup"
                    type="text"
                    defaultValue={formData.stoneGroup}
                />
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="pieces">Pcs</label>
                <input
                    id="pieces"
                    name="pieces"
                    type="number"
                    defaultValue={formData.pieces}
                />
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="stoneWeight">Stone Wt</label>
                <input
                    id="stoneWeight"
                    name="stoneWeight"
                    type="number"
                    defaultValue={formData.stoneWeight}
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
                    type="submit"
                    >
                    Update
                    </Button>
                </div>
            </div>
        </form>
}