import { useState } from "react";
import classes from "./DesignFields.module.css";
import ModalComponent from "./ModalComponent";
import UpdateFieldsForm from "./UpdateFieldsForm";

export default function DesignFields({ cardItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleStartUpdateFields() {
    setIsModalOpen(true);
  }

  function handleCancelUpdate() {
    setIsModalOpen(false);
  }

  function handleUpdateAction(updatedData){
    console.log("updated Fields Data", updatedData);
  }

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

      {isModalOpen && <ModalComponent
        isOpen={isModalOpen}
        // onSave={handleUpdateFields}
        style={{ maxWidth: "90%", minWidth: "80%" }}
        // onCancel={handleCancelUpdate}
      >
        <UpdateFieldsForm onAction={handleUpdateAction} cardItem={cardItem} onCloseModal={handleCancelUpdate} />
      </ModalComponent>}
    </>
  );
}
