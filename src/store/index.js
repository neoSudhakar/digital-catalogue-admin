import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import assignRetailerReducer from "./assignRetailer-slice";

const store= configureStore({
    reducer:{
        ui: uiReducer,
        assignRetailer: assignRetailerReducer
    }
});

export default store;