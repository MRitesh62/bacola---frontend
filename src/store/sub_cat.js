import { createSlice } from "@reduxjs/toolkit";
import { get_Subcat } from "./product-action";

const initialState = {
    sub_category:[],
    errors: [],
    status:"idle"
}

const sub_catSlice = createSlice({
    name: "sub_category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_Subcat.pending, (state) => {
            state.status="pending"
            })
            .addCase(get_Subcat.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.sub_category = action.payload.data
                
            })
            .addCase(get_Subcat.rejected, (state, action) => {
                state.errors.push(action.payload)
                state.status="failed"
            })
    }
})

export const sub_categoryActions = sub_catSlice.actions;
export default sub_catSlice.reducer;