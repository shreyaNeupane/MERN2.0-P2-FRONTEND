import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import ProductSlice from "./productSlice";
import cartSlice from './cartSlice'


 const store = configureStore({
    reducer:{
        auth : authSlice,
        products: ProductSlice,
       carts : cartSlice
    }
})

export default store

export type AppDispatch = typeof store.dispatch
//generic datatype
export type RootState = ReturnType<typeof store.getState>