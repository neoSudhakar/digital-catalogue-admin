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

    return <form className={classes.form} onSubmit={handleSubmit} style={{paddingTop: "2rem"}}>
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
      {/* <input
        id="mainGroup"
        name="mainGroup"
        type="text"
        defaultValue={cardItem.mainGroup}
      /> */}
      <select name="mainGroup" id="mainGroup" defaultValue={cardItem.mainGroup} >
        <option value="Diamond">Diamond</option>
        <option value="Gold">Gold</option>
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="category">Category</label>
      {/* <input
        id="category"
        name="category"
        type="text"
        defaultValue={cardItem.category}
      /> */}
      <select name="category" id="category" defaultValue={cardItem.category} >
        <option value="Diamond Jewelery">Diamond Jewelery</option>
        <option value="Gold Jewelery">Gold Jewelery</option>
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="style">Style</label>
      {/* <input
        id="style"
        name="style"
        type="text"
        defaultValue={cardItem.style}
      /> */}
      <select name="style" id="style" defaultValue={cardItem.style} >
        <option value="Style1">Style1</option>
        <option value="Style2">Style2</option>
        <option value="Style3">Style3</option>
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="product">Product</label>
      {/* <input
        id="product"
        name="product"
        type="text"
        defaultValue={cardItem.product}
      /> */}
      <select name="product" id="product" defaultValue={cardItem.product} >
        <option value="Product1">Product1</option>
        <option value="Product2">Product2</option>
        <option value="Product3">Product3</option>
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="model">Model</label>
      {/* <input
        id="model"
        name="model"
        type="text"
        defaultValue={cardItem.model}
      /> */}
      <select name="model" id="model" defaultValue={cardItem.model} >
        <option value="Model1">Model1</option>
        <option value="Model2">Model2</option>
        <option value="Model3">Model3</option>
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="size">Size</label>
      {/* <input
        id="size"
        name="size"
        type="text"
        defaultValue={cardItem.size}
      /> */}
      <select name="size" id="size" defaultValue={cardItem.size} >
        <option value="Size1">Size1</option>
        <option value="Size2">Size2</option>
        <option value="Size3">Size3</option>
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="worker">Worker</label>
      {/* <input
        id="worker"
        name="worker"
        type="text"
        defaultValue={cardItem.worker}
      /> */}
      <select name="worker" id="worker" defaultValue={cardItem.worker} >
        <option value="Worker1">Worker1</option>
        <option value="Worker2">Worker2</option>
        <option value="Worker3">Worker3</option>
      </select>
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