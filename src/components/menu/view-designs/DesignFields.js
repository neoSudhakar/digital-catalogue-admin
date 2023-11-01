import { useEffect, useState } from "react";
import classes from "./DesignFields.module.css";
import ModalComponent from "./ModalComponent";
import UpdateFieldsForm from "./UpdateFieldsForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AssignRetailer from "./AssignRetailer";
import { assignRetailerSliceActions } from "../../../store/assignRetailer-slice";

export default function DesignFields({ cardItem }) {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assignRetailersListData, setAssignRetailersListData] = useState();

  const assignedDesigns = useSelector((state)=>state.assignRetailer.assignedDesigns);
  // console.log("assignedDesigns are:", assignedDesigns);

  
  const DUMMY_RETAILERS = useSelector((state)=>state.assignRetailer.retailers);
  // console.log("DUMMY_RETAILers : ", DUMMY_RETAILERS);
  
  useEffect(()=>{

    const assignedDesignIndex = assignedDesigns.findIndex((assignedDesign)=>{
      return assignedDesign.designId === cardItem.id;
    })

    if(assignedDesignIndex > -1){
      const assignedDesign = assignedDesigns[assignedDesignIndex];
      console.log("assignedDesign is: ", assignedDesign);
      const {retailersDataList} = assignedDesign;

      console.log("retalers data list is: ", retailersDataList);

      setAssignRetailersListData(retailersDataList);
    }
  }, [assignedDesigns, cardItem]);

  function handleStartUpdateFields() {
    setIsModalOpen(true);
  }

  function handleCancelUpdate() {
    setIsModalOpen(false);
  }

  function handleUpdateAction(updatedData){
    console.log("updated Fields Data", updatedData);
    console.log(cardItem.id);
    fetch(`http://localhost:8080/api/designs/${cardItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify(updatedData),
    });
  }

  function getRetailerName(id){
    const retailerObj = DUMMY_RETAILERS.find((eachObj)=>{
      return eachObj.accountId === id;
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

  function handleRemoveAssign(retailerData){
    dispatch(assignRetailerSliceActions.removeAssignDesign({designId: cardItem.id, retailerId: retailerData.retailerId}));
  }

  return (
    <>
      <section className={classes.content}>
        {assignRetailersListData && (
          <ul className={classes["assigned-retailers"]}>
            {assignRetailersListData.map((retailerData)=>{
                return <li key={retailerData.retailerId} className={classes["assigned-retailer"]}>
                  <p><span>Assigned Retailer : </span>{getRetailerName(retailerData.retailerId)}</p>
                  <p><span>Active Days : </span>{retailerData.days}</p>
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
        )}
        <AssignRetailer cardItem={cardItem} isModalOpen={isEditAssignModalOpen} onCloseModal={handleCancelEditAssign} edit prevRetailerData={prevRetailerData} />

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
