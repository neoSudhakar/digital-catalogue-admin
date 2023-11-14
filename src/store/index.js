import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import assignRetailerReducer from "./assignRetailer-slice";
import cartSliceReducer from "./cart-slice";

const store= configureStore({
    reducer:{
        ui: uiReducer,
        assignRetailer: assignRetailerReducer,
        cart: cartSliceReducer,
    }
});

export default store;