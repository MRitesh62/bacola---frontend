import { createSlice } from "@reduxjs/toolkit";
import { get_category } from "./product-action";
const initialState = {
    category:[],
    errors: [],
    status:"idle"
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_category.pending, (state) => {
            state.status="pending"
            })
            .addCase(get_category.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.category = action.payload.data
                
            })
            .addCase(get_category.rejected, (state, action) => {
                state.errors.push(action.payload)
                state.status="failed"
            })
    }
})

export const categoriesActions = categorySlice.actions;
export default categorySlice.reducer;