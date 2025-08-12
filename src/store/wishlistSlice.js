import { createSlice } from "@reduxjs/toolkit";
import { wishlist, addWishlist } from "./product-action";


const saveList = (listData) => {
    sessionStorage.setItem("wishlist", JSON.stringify(listData));
};

const loadWishlist = () => {
    const storedWishlist = sessionStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : { data: { products: [] } };
};

const initialState = {
    list: loadWishlist(),
    error: [],
    status:'idle'
}


const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        listAction: (state, action) => {
            state.list = action.payload;
            saveList(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(wishlist.pending, (state) => {
                state.status = "pending"
            })
            .addCase(wishlist.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.list = action.payload
                saveList(action.payload); // Save to sessionStorage
            })
            .addCase(wishlist.rejected, (state, action) => {
                state.error.push(action.payload)
                state.status = "rejected"
            })
            .addCase(addWishlist.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.list = action.payload; // Update cart with the latest data
                saveList(action.payload);
            })
    }
})

export const { listAction } = listSlice.actions;

export default listSlice.reducer;