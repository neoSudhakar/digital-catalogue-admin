
import { createSlice } from "@reduxjs/toolkit";

// const DUMMY_RETAILERS = [
//     {accountId:"r1", name: "Retailer 1"},
//     {accountId:"r2", name: "Retailer 2"},
//     {accountId:"r3", name: "Retailer 3"},
//     {accountId:"r4", name: "Retailer 4"},
//     {accountId:"r5", name: "Retailer 5"},
//     {accountId:"r6", name: "Retailer 6"},
// ]

const initialState = {
    assignedDesigns : [],
    retailers : [],
};

const assignRetailerSlice = createSlice({
    name: "assignRetailer",
    initialState: initialState,
    reducers: {
        assignDesign(state, action){
            const design = action.payload;
            const {days, designId, retailer} = design;

            const existingDesignIndex = state.assignedDesigns.findIndex((assignedDesign)=>{
                return assignedDesign.designId === designId;
            });
            if (existingDesignIndex > -1){
                const existingDesign = state.assignedDesigns[existingDesignIndex];
                const existingRetailerDataIndex = existingDesign.retailersDataList.findIndex((eachRetailerData)=>{
                    return eachRetailerData.retailerId === retailer;
                });

                if(existingRetailerDataIndex > -1){
                    state.assignedDesigns[existingDesignIndex].retailersDataList[existingRetailerDataIndex].activeTillDate = days;
                    return ;
                }
                else{
                    state.assignedDesigns[existingDesignIndex].retailersDataList.push({retailerId: retailer, activeTillDate: days});
                }
            }
            else{
                const updatedData = {
                    designId,
                    retailersDataList: [{retailerId: retailer, activeTillDate: days}],
                }
                state.assignedDesigns.push(updatedData);
            }
        },
        editAssignDesign(state, action){
            const {design, prevRetailerId} = action.payload;
            const {days, designId, retailer} = design;

            const existingDesignIndex = state.assignedDesigns.findIndex((assignedDesign)=>{
                return assignedDesign.designId === designId;
            });
            if (existingDesignIndex > -1){
                const existingDesign = state.assignedDesigns[existingDesignIndex];
                const existingRetailerDataIndex = existingDesign.retailersDataList.findIndex((eachRetailerData)=>{
                    return eachRetailerData.retailerId === prevRetailerId;
                });

                if(existingRetailerDataIndex > -1){
                    state.assignedDesigns[existingDesignIndex].retailersDataList[existingRetailerDataIndex] = {retailerId: retailer, activeTillDate: days};
                    return ;
                }
            }
        },
        removeAssignDesign(state, action){
            const {designId, retailerId} = action.payload;

            const existingDesignIndex = state.assignedDesigns.findIndex((assignedDesign)=>{
                return assignedDesign.designId === designId;
            });
            if (existingDesignIndex > -1){
                const retailerIdIndex = state.assignedDesigns[existingDesignIndex].retailersDataList.findIndex((eachRetailerData)=>{
                    return eachRetailerData.retailerId === retailerId;
                });

                state.assignedDesigns[existingDesignIndex].retailersDataList.splice(retailerIdIndex, 1);
            }
        },
        setRetailerAccounts(state, action){
            const accounts = action.payload;
            state.retailers = accounts;
        }
    }
})

export const assignRetailerSliceActions = assignRetailerSlice.actions;

export default assignRetailerSlice.reducer;






// import { createSlice } from "@reduxjs/toolkit";

// const DUMMY_RETAILERS = [
//     {id:"r1", name: "Retailer 1"},
//     {id:"r2", name: "Retailer 2"},
//     {id:"r3", name: "Retailer 3"},
//     {id:"r4", name: "Retailer 4"},
//     {id:"r5", name: "Retailer 5"},
//     {id:"r6", name: "Retailer 6"},
// ]

// const initialState = {
//     assignedDesigns : [],
//     retailers : DUMMY_RETAILERS,
// };

// const assignRetailerSlice = createSlice({
//     name: "assignRetailer",
//     initialState: initialState,
//     reducers: {
//         assignDesign(state, action){
//             const design = action.payload;
//             const {days, designId, retailerIds} = design;

//             const existingDesignIndex = state.assignedDesigns.findIndex((assignedDesign)=>{
//                 return assignedDesign.designId === designId;
//             });
//             if (existingDesignIndex > -1){
//                 const updatedList = retailerIds.map((retailerId) => ({retailerId: retailerId, days: days}));
//                 state.assignedDesigns[existingDesignIndex].retailersDataList.push(...updatedList);
//                 // const existingDesign = state.assignedDesigns[existingDesignIndex];
//                 // const existingRetailerDataIndex = existingDesign.retailersDataList.findIndex((eachRetailerData)=>{
//                 //     return eachRetailerData.retailerId === retailer;
//                 // });

//                 // if(existingRetailerDataIndex > -1){
//                 //     state.assignedDesigns[existingDesignIndex].retailersDataList[existingRetailerDataIndex].days = days;
//                 //     return ;
//                 // }
//                 // else{
//                 //     state.assignedDesigns[existingDesignIndex].retailersDataList.push({retailerId: retailer, days});
//                 // }
//             }
//             else{
//                 const updatedData = {
//                     designId,
//                     retailersDataList: retailerIds.map((retailerId) => ({retailerId: retailerId, days: days})),
//                 }
//                 state.assignedDesigns.push(updatedData);
//             }
//         },
//         editAssignDesign(state, action){
//             const {design, prevRetailerId} = action.payload;
//             const {days, designId, retailerIds} = design;

//             const existingDesignIndex = state.assignedDesigns.findIndex((assignedDesign)=>{
//                 return assignedDesign.designId === designId;
//             });
//             if (existingDesignIndex > -1){
//                 const updatedList = retailerIds.map((retailerId) => ({retailerId: retailerId, days: days}));
//                 state.assignedDesigns[existingDesignIndex].retailersDataList.push(...updatedList);
//                 // const existingDesign = state.assignedDesigns[existingDesignIndex];
//                 // const existingRetailerDataIndex = existingDesign.retailersDataList.findIndex((eachRetailerData)=>{
//                 //     return eachRetailerData.retailerId === prevRetailerId;
//                 // });

//                 // if(existingRetailerDataIndex > -1){
//                 //     state.assignedDesigns[existingDesignIndex].retailersDataList[existingRetailerDataIndex] = {retailerId:retailer, days};
//                 //     return ;
//                 // }
//             }
//         },
//         removeAssignDesign(state, action){
//             const {designId, retailerId} = action.payload;

//             const existingDesignIndex = state.assignedDesigns.findIndex((assignedDesign)=>{
//                 return assignedDesign.designId === designId;
//             });
//             if (existingDesignIndex > -1){
//                 const retailerIdIndex = state.assignedDesigns[existingDesignIndex].retailersDataList.findIndex((eachRetailerData)=>{
//                     return eachRetailerData.retailerId === retailerId;
//                 });

//                 state.assignedDesigns[existingDesignIndex].retailersDataList.splice(retailerIdIndex, 1);
//             }
//         }
//     }
// })

// export const assignRetailerSliceActions = assignRetailerSlice.actions;

// export default assignRetailerSlice.reducer;





