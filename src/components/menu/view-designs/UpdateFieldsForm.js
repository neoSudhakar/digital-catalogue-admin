import Button from "../../../UI/Button";
import classes from "./DesignFields.module.css";

export default function UpdateFieldsForm({cardItem, onAction, onCloseModal}){

    function handleSubmit(event) {
        event.preventDefault();
    
        const form = new FormData(event.target);
        const formData = Object.fromEntries(form);

        onAction(formData);

        onCloseModal();
    
        alert("Updated");
    }
    
    const cancelStyleObj = {
        backgroundColor: "white",
        color: "blue",
        border: "1px solid blue",
    };
    const saveStyleObj = { backgroundColor: "blue" };

    return <form className={classes.form} onSubmit={handleSubmit}>
    <div className={classes["input-grp"]}>
      <label htmlFor="designNumber">Design Number</label>
      <input
        id="designNumber"
        name="designNumber"
        type="number"
        defaultValue={cardItem.designNumber}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="mainGroup">Main Group</label>
      <input
        id="mainGroup"
        name="mainGroup"
        type="text"
        defaultValue={cardItem.mainGroup}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        type="text"
        defaultValue={cardItem.category}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="style">Style</label>
      <input
        id="style"
        name="style"
        type="text"
        defaultValue={cardItem.style}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="product">Product</label>
      <input
        id="product"
        name="product"
        type="text"
        defaultValue={cardItem.product}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="model">Model</label>
      <input
        id="model"
        name="model"
        type="text"
        defaultValue={cardItem.model}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="size">Size</label>
      <input
        id="size"
        name="size"
        type="text"
        defaultValue={cardItem.size}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="worker">Worker</label>
      <input
        id="worker"
        name="worker"
        type="text"
        defaultValue={cardItem.worker}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="pieces">Pieces</label>
      <input
        id="pieces"
        name="pieces"
        type="number"
        defaultValue={cardItem.pieces}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="grossWeight">Gross Wt</label>
      <input
        id="grossWeight"
        name="grossWeight"
        type="number"
        defaultValue={cardItem.grossWeight}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="stoneWeight">Stone Wt</label>
      <input
        id="stoneWeight"
        name="stoneWeight"
        type="number"
        defaultValue={cardItem.stoneWeight}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="netWeight">Net Wt</label>
      <input
        id="netWeight"
        name="netWeight"
        type="number"
        defaultValue={cardItem.netWeight}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="componentWeight">Component Wt</label>
      <input
        id="componentWeight"
        name="componentWeight"
        type="number"
        defaultValue={cardItem.componentWeight}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="ghatWeight">Ghat Wt</label>
      <input
        id="ghatWeight"
        name="ghatWeight"
        type="number"
        defaultValue={cardItem.ghatWt}
      />
    </div>
    <div className={classes.actions}>
      <div>
        <Button
          key="back"
          type="button"
          style={cancelStyleObj}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button key="submit" style={saveStyleObj} type="submit">
          Update
        </Button>
      </div>
    </div>
  </form>
}