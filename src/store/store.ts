import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import ProductSlice from "./productSlice";


 const store = configureStore({
    reducer:{
        auth : authSlice,
        products: ProductSlice
    }
})

export default store

export type AppDispatch = typeof store.dispatch
//generic datatype
export type RootState = ReturnType<typeof store.getState>