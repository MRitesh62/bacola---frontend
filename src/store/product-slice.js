import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./product-action";
const initialState = {
    products: [],
    errors: [],totalProducts: 0,
    status:"idle"
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
            state.status="pending"
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.products = action.payload
                // console.log("state",state.products);
                
                state.totalProducts = action.payload.totalProducts;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.errors.push(action.payload)
                state.status="failed"
            })
    }
})

export const productActions = productSlice.actions;
export default productSlice.reducer;