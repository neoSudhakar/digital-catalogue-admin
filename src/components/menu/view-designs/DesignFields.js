import { useState } from "react";
import classes from "./DesignFields.module.css";
import ModalComponent from "./ModalComponent";
import { Form } from "react-router-dom";
import Button from "../../../UI/Button";

export default function DesignFields({ cardItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleStartUpdateFields() {
    setIsModalOpen(true);
  }

  function handleCancelUpdate() {
    setIsModalOpen(false);
  }

//   function handleUpdateFields() {
//     alert("Updated");
//     setIsModalOpen(false);
//   }

  function handleSubmit(event){
    event.preventDefault();

    const form = new FormData(event.target);
    const formData= Object.fromEntries(form);

    console.log(formData);

    alert("Updated");
    setIsModalOpen(false);
  }

  const cancelStyleObj={backgroundColor: "white", color: "blue", border: "1px solid blue"};
  const saveStyleObj={backgroundColor: "blue"};

  return (
    <>
      <section className={classes.content}>
        {/* <h2 className={classes.title}>Design {cardItem.id}</h2> */}
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
            <p>{cardItem.createdDate}</p>
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
            <p>{cardItem.grossWeight}</p>
          </div>
          <div>
            <span>Stone Weight: </span>
            <p>{cardItem.stoneWeight}</p>
          </div>
          <div>
            <span>Net Weight: </span>
            <p>{cardItem.netWeight}</p>
          </div>
          <div>
            <span>Component Weight: </span>
            <p>{cardItem.componentWeight}</p>
          </div>
          <div>
            <span>Ghat Weight: </span>
            <p>{cardItem.ghatWt}</p>
          </div>
        </div>
      </section>

      <ModalComponent
        isOpen={isModalOpen}
        // onSave={handleUpdateFields}
        style={{maxWidth: "90%", minWidth: "80%"}}
        // onCancel={handleCancelUpdate}
      >
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes["input-grp"]}>
                <label htmlFor="designNumber">Design Number</label>
                <input id="designNumber" name="designNumber" type="number" defaultValue={cardItem.designNumber}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="mainGroup">Main Group</label>
                <input id="mainGroup" name="mainGroup" type="text" defaultValue={cardItem.mainGroup}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="category">Category</label>
                <input id="category" name="category" type="text" defaultValue={cardItem.category}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="style">Style</label>
                <input id="style" name="style" type="text" defaultValue={cardItem.style}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="product">Product</label>
                <input id="product" name="product" type="text" defaultValue={cardItem.product}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="model">Model</label>
                <input id="model" name="model" type="text" defaultValue={cardItem.model}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="size">Size</label>
                <input id="size" name="size" type="text" defaultValue={cardItem.size}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="worker">Worker</label>
                <input id="worker" name="worker" type="text" defaultValue={cardItem.worker}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="pieces">Pieces</label>
                <input id="pieces" name="pieces" type="number" defaultValue={cardItem.pieces}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="grossWeight">Gross Wt</label>
                <input id="grossWeight" name="grossWeight" type="number" defaultValue={cardItem.grossWeight}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="stoneWeight">Stone Wt</label>
                <input id="stoneWeight" name="stoneWeight" type="number" defaultValue={cardItem.stoneWeight}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="netWeight">Net Wt</label>
                <input id="netWeight" name="netWeight" type="number" defaultValue={cardItem.netWeight}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="componentWeight">Component Wt</label>
                <input id="componentWeight" name="componentWeight" type="number" defaultValue={cardItem.componentWeight}/>
            </div>
            <div className={classes["input-grp"]}>
                <label htmlFor="ghatWeight">Ghat Wt</label>
                <input id="ghatWeight" name="ghatWeight" type="number" defaultValue={cardItem.ghatWt}/>
            </div>
            <div className={classes.actions}>
                <div>
                <Button key="back" type="button" style={cancelStyleObj} onClick={handleCancelUpdate}>
                    Cancel
                </Button>
                <Button key="submit" style={saveStyleObj} type="submit">
                    Update
                </Button>
                </div>
            </div>
        </form>
      </ModalComponent>
    </>
  );
}
