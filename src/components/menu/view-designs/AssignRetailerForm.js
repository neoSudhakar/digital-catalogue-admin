import { useEffect, useState } from "react";
import Button from "../../../UI/Button";
// import classes from "./DesignFields.module.css";
import classes from "./AddDesignTableForm.module.css"
import { useSelector } from "react-redux";



export default function AssignRetailerForm({cardItem, assignRetailersListData , onAction, onCloseModal, prevRetailerData, edit, isPending, isErrorBlock, onCloseErrModal}){
  const [retailerIdsList, setRetailerIdsList] = useState([]);

  console.log("assign retailersListData is: ", assignRetailersListData);

  const RETAILERS = useSelector((state)=>state.assignRetailer.retailers);

  useEffect(()=>{
    if(!isErrorBlock && assignRetailersListData.length > 0){
      const formattedList = assignRetailersListData.map((retailerData)=>{
        return retailerData.retailerId;
      })
      console.log("formatted list of ids: ", formattedList);
      setRetailerIdsList(formattedList)
  }
  },[assignRetailersListData, isErrorBlock]);

  

    function handleSubmit(event) {
        event.preventDefault();
    
        const form = new FormData(event.target);
        let formData = Object.fromEntries(form.entries());

        onAction(formData);

    }

    function handleCloseErrModal(event){
      event.preventDefault();
      onCloseErrModal();
    }
    
    const cancelStyleObj = {
        backgroundColor: "white",
        color: "blue",
        border: "1px solid blue",
    };
    const saveStyleObj = { backgroundColor: "blue" };

    let content = (
      <form className={classes.form} onSubmit={handleSubmit} style={{paddingTop: "0.5rem"}}>

      <div className={classes["input-grp"]}>
        <label htmlFor="days">Days</label>
        <input
          id="days"
          name="days"
          type="number"
          defaultValue={prevRetailerData ? prevRetailerData.activeTillDate : 1}
          min={1}
          step={1}
          required
        />
      </div>

      <div className={classes["input-grp"]}>
        <label htmlFor="retailer">Retailer</label>
        <select name="retailer" id="retailer" required defaultValue={prevRetailerData ? prevRetailerData.retailerId : ""}>
          <option value="" disabled hidden>Select an option</option>
          {RETAILERS.map((retailer) => (
            <option key={retailer.id} value={retailer.id} disabled={
                (!edit && retailerIdsList.includes(retailer.id)) ||
                (edit && retailerIdsList.includes(retailer.id) && retailer.id !== prevRetailerData.retailerId)
              }
            >
              {retailer.name}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.actions}>
        {!isPending && <div>
          <Button
            key="back"
            type="button"
            style={cancelStyleObj}
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          <Button key="submit" style={saveStyleObj} type="submit">
            {edit ? "Update" : "Assign" }
          </Button>
        </div>}
        {isPending && <p>{edit ? "Updating..." : "Assigning..."}</p>}
      </div>
    </form>
    )

    if(isErrorBlock){
      content = (
        <form className={classes.form} onSubmit={handleCloseErrModal} style={{padding: "0rem"}}>
          <div className={classes.actions} style={{marginTop: "0"}}>
          <Button key="submit" style={saveStyleObj} type="submit">
            Okay
          </Button>
          </div>
        </form>
      )
    }

    return (
      <>{content}</> 
  )
}






// import React, { useEffect, useState } from "react";
// import Select from "react-select"; // Import the Select component from react-select
// import Button from "../../../UI/Button";
// import classes from "./DesignFields.module.css";
// import { useSelector } from "react-redux";

// export default function AssignRetailerForm({ cardItem, onAction, onCloseModal, prevRetailerData, edit }) {
//   const DUMMY_RETAILERS = useSelector((state) => state.assignRetailer.retailers);
//   const assignedDesigns = useSelector((state) => state.assignRetailer.assignedDesigns);

//   const [selectedOptions, setSelectedOptions] = useState([]);

//   useEffect(() => {
//     const assignedDesignIndex = assignedDesigns.findIndex((assignedDesign) => {
//       return assignedDesign.designId === cardItem.id;
//     });

//     if (assignedDesignIndex > -1) {
//       const retailersDataList = assignedDesigns[assignedDesignIndex].retailersDataList;
//       const retailerIds = retailersDataList.map((retailerData) => {
//         return retailerData.retailerId;
//       });

//       // Convert retailerIds to an array of objects with 'value' and 'label' properties
//       const selectedOptions = retailerIds.map((retailerId) => {
//         const retailer = DUMMY_RETAILERS.find((r) => r.id === retailerId);
//         return { value: retailer.id, label: retailer.name };
//       });

//       setSelectedOptions(selectedOptions);
//     }
//   }, [assignedDesigns, DUMMY_RETAILERS, cardItem.id]);

//   function isRetailerDisabled(retailerId) {
//     return (
//       (!edit && selectedOptions.some((option) => option.value === retailerId)) ||
//       (edit && selectedOptions.some((option) => option.value === retailerId && option.value !== prevRetailerData.retailerId))
//     );
//   }

//   function handleSubmit(event) {
//     event.preventDefault();

//     const form = new FormData(event.target);
//     let formData = Object.fromEntries(form.entries());

//     // Add selected options to formData
//     formData = {
//       ...formData,
//       retailerIds: selectedOptions.map((option) => option.value),
//     };

//     onAction(formData);
//     onCloseModal();
//     alert("Updated");
//   }

//   const cancelStyleObj = {
//     backgroundColor: "white",
//     color: "blue",
//     border: "1px solid blue",
//   };
//   const saveStyleObj = { backgroundColor: "blue" };

//   return (
//     <form className={classes.form} onSubmit={handleSubmit} style={{ paddingTop: "2rem" }}>
//       <div className={classes["input-grp"]}>
//         <label htmlFor="days">Days</label>
//         <input
//           id="days"
//           name="days"
//           type="number"
//           defaultValue={prevRetailerData ? prevRetailerData.days : 1}
//           min={1}
//           step={1}
//           required
//         />
//       </div>

//       <div className={classes["input-grp"]}>
//         <label htmlFor="retailer">Retailer</label>
//         {/* Use Select component for multi-select dropdown */}
//         <Select
//           options={DUMMY_RETAILERS.map((retailer) => ({
//             value: retailer.id,
//             label: retailer.name,
//             isDisabled: isRetailerDisabled(retailer.id),
//           }))}
//           isMulti // Allow multiple options to be selected
//           // value={selectedOptions}
//           defaultValue={prevRetailerData ? prevRetailerData.retailerId : ""}
//           onChange={setSelectedOptions}
//           isSearchable // Enable search functionality
//         />
//       </div>

//       <div className={classes.actions}>
//         <div>
//           <Button key="back" type="button" style={cancelStyleObj} onClick={onCloseModal}>
//             Cancel
//           </Button>
//           <Button key="submit" style={saveStyleObj} type="submit">
//             Update
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }

