import { useEffect, useState } from "react";
import classes from "./DesignFields.module.css";
import ModalComponent from "./ModalComponent";
import UpdateFieldsForm from "./UpdateFieldsForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AssignRetailer from "./AssignRetailer";
import { assignRetailerSliceActions } from "../../../store/assignRetailer-slice";

export default function DesignFields({ cardItem1, onAnyUpdateAction, assignRetailersListData, setMsg }) {

  const [cardItem, setCardItem] = useState(cardItem1);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const RETAILERS = useSelector((state)=>state.assignRetailer.retailers);

  function handleStartUpdateFields() {
    setIsModalOpen(true);
  }

  function handleCancelUpdate() {
    setIsModalOpen(false);
  }

  async function handleUpdateAction(updatedData){
    // console.log("updated Fields Data", updatedData);
    // console.log(cardItem.id);
    const response = await fetch(`http://localhost:8080/api/designs/${cardItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify(updatedData),
    });

    if(response.ok){
      // onAnyUpdateAction(cardItem.id);
      const resData = await response.json();
      setCardItem(resData);
      console.log("res data is:",resData);
    }
  }

  function getRetailerName(id){
    // console.log("id is " + id);
    // console.log("type of id is ", typeof id);

    const retailerObj = RETAILERS.find((eachObj)=>{
      // console.log(eachObj);
      return eachObj.id === id;
    })
    // console.log("Retailer Object : ", retailerObj);
    return retailerObj.name;
  }

  const [isEditAssignModalOpen, setIsEditAssignModalOpen] = useState(false);
  const [prevRetailerData, setPrevRetailerData] = useState();

  function handleStartEditAssign(retailerData){
    setPrevRetailerData(retailerData);
    setIsEditAssignModalOpen(true);
  }

  function handleCancelEditAssign(){
    setIsEditAssignModalOpen(false);
  }

  async function handleRemoveAssign(retailerData){
    const response = await fetch(`http://localhost:8080/api/design-account/${retailerData.id}`, {
      method: "DELETE",
    })

    if(response.ok){
      // onAnyUpdateAction(cardItem.id);
      const resMsg = await response.json();
      setMsg("Deleted Successfully");
      console.log("del res msg: " + resMsg)

      dispatch(assignRetailerSliceActions.removeAssignDesign({designId: cardItem.id, retailerId: retailerData.retailerId}));
    }
  }

  return (
    <>
      <section className={classes.content}>
        {assignRetailersListData.length > 0 && (
          <>
          <ul className={classes["assigned-retailers"]}>
            {assignRetailersListData.map((retailerData)=>{
                return <li key={retailerData.id} className={classes["assigned-retailer"]}>
                  <p><span>Assigned Retailer : </span>{getRetailerName(retailerData.retailerId)}</p>
                  <p><span>Active Days : </span>{retailerData.activeTillDate}</p>
                  <div className={classes["assign-actions"]}>
                    <button
                      className={classes["edit-assign"]}
                      onClick={()=>handleStartEditAssign(retailerData)}
                    >
                      Edit
                    </button>
                    <button
                      className={classes["remove-assign"]}
                      onClick={()=>handleRemoveAssign(retailerData)}
                    >
                      Remove
                    </button>

                  </div>
                </li>
              })
            }
          </ul>
        </>
        )}
        {isEditAssignModalOpen && <AssignRetailer setMsg={setMsg} onAnyUpdateAction={onAnyUpdateAction} cardItem={cardItem} assignRetailersListData={assignRetailersListData} isModalOpen={isEditAssignModalOpen} onCloseModal={handleCancelEditAssign} edit prevRetailerData={prevRetailerData} />
}
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
            <p>{cardItem.createdDate.slice(0,10)}</p>
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
            <p>{cardItem.grossWeight} grms</p>
          </div>
          <div>
            <span>Stone Weight: </span>
            <p>{cardItem.stoneWeight} grms</p>
          </div>
          <div>
            <span>Net Weight: </span>
            <p>{cardItem.netWeight} grms</p>
          </div>
          <div>
            <span>Component Weight: </span>
            <p>{cardItem.componentWeight} grms</p>
          </div>
          <div>
            <span>Ghat Weight: </span>
            <p>{cardItem.ghatWt} grms</p>
          </div>
        </div>
      </section>

      {isModalOpen && <ModalComponent
        isOpen={isModalOpen}
        title={"UPDATE DESIGN"}
        // onSave={handleUpdateFields}
        style={{ maxWidth: "90%", minWidth: "80%", }}
        // onCancel={handleCancelUpdate}
      >
        <UpdateFieldsForm onAction={handleUpdateAction} cardItem={cardItem} onCloseModal={handleCancelUpdate} />
      </ModalComponent>}
    </>
  );
}