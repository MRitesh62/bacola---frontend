import { createSlice } from "@reduxjs/toolkit";
import { cart, addToCart } from "./product-action";

// console.log("cart action: ", cart);
// console.log("addToCart action: ", addToCart);
// Load cart from sessionStorage when the app starts
const loadCartFromStorage = () => {
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { data: { products: [], totalPrice: 0 } };
};

// Save cart to sessionStorage
const saveCartToStorage = (cartData) => {
    sessionStorage.setItem("cart", JSON.stringify(cartData));
};

const initialState = {
    cart: loadCartFromStorage(),
    error: [],
    status:'idle'
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {cartAction: (state, action) => {
        state.cart = action.payload;
        saveCartToStorage(action.payload); // Save to sessionStorage
    }},
    extraReducers: (builder) => {
        builder
            .addCase(cart.pending, (state) => {
            state.status="pending"
            })
            .addCase(cart.fulfilled, (state,action) => {
                state.status = "fulfilled"
                state.cart = action.payload
        saveCartToStorage(action.payload); // Save to sessionStorage
            })
            .addCase(cart.rejected, (state,action) => {
                state.error.push(action.payload)
            state.status="rejected"
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.cart = action.payload; // Update cart with the latest data
        saveCartToStorage(action.payload); // Save to sessionStorage

            });
    }
})

export const {cartAction} = cartSlice.actions;
export default cartSlice.reducer;