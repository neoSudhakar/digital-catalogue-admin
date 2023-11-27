import { createSlice } from "@reduxjs/toolkit";

const initialState = {orders: [], isOrdersOpen: false};

const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        setOrders(state, action){
            state.orders = action.payload;
        },
        toggleOrders(state){
            state.isOrdersOpen = !state.isOrdersOpen;
        }
    }
});

export const ordersSliceActions = ordersSlice.actions;

export default ordersSlice.reducer;