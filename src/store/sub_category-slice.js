import { createSlice } from "@reduxjs/toolkit";
import { get_Subcategory } from "./product-action";
const initialState = {
    sub_categories:[],
    errors: [],
    status:"idle"
}

const sub_categorySlice = createSlice({
    name: "sub_category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_Subcategory.pending, (state) => {
            state.status="pending"
            })
            .addCase(get_Subcategory.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.sub_categories = action.payload.data
                
            })
            .addCase(get_Subcategory.rejected, (state, action) => {
                state.errors.push(action.payload)
                state.status="failed"
            })
    }
})

export const sub_categoriesActions = sub_categorySlice.actions;
export default sub_categorySlice.reducer;