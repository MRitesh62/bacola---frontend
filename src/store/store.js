import { configureStore } from '@reduxjs/toolkit'
import productReducer from './product-slice';
import sub_categoryReducer from './sub_category-slice';
import categoryReducer from './category-slice';
import sub_catReducer from './sub_cat'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import listReducer from './wishlistSlice'
export const store = configureStore({
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions:["getProducts"]
            }
        })
    },
    reducer: {
        product: productReducer,
        sub_category: sub_categoryReducer,
        category: categoryReducer,
        sub_cat:sub_catReducer,
        auth: authReducer,
        cart: cartReducer,
        list:listReducer
  },
})