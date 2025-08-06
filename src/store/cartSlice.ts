import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type { CartItem, CartState } from "../globals/types/cartTypes"
import { Status } from "../globals/types/types"
import type { AppDispatch } from "./store"
import { APIAuthenticated } from "../http"

const initialState:CartState={
    items :[],
    status : Status.LOADING
}
interface DeleteAction{
  productId : string
}
interface UpdateAction extends DeleteAction{
  quantity :number
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state: CartState, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    setStatus(state: CartState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setDeleteItem(state: CartState, action: PayloadAction<DeleteAction>) {
      const index = state.items.findIndex(
        (item) => (item.product.id === action.payload.productId)
      );
      state.items.splice(index, 1);
    },
    setUpdateItem(state: CartState, action: PayloadAction<UpdateAction>) {
      // Look through the items array to find the index of the item
      // where the product.id matches the productId from the action payload
      const index = state.items.findIndex(
        (item) => item.product.id === action.payload.productId
      );

      // If a matching item was found (findIndex returns -1 when not found)
      if (index !== -1) {
        // Update the quantity of the found item with the new quantity from the payload
        state.items[index].quantity = action.payload.quantity;
      }
    },
  },
});

export const {setItems,setStatus,setDeleteItem,setUpdateItem} = cartSlice.actions
export default cartSlice.reducer

export function addToCart(productId:string){
    return async function addToCartThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try{
            const response = await APIAuthenticated.post('/customer/cart',{
                productId,
                quantity : 1
            })
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchCartItems(productId: string) {
  return async function fetchCartItemsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("/customer/cart");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteCartItem(productId: string) {
  return async function deleteCartItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
     
      const response = await APIAuthenticated.delete('/customer/cart/'+ productId);
      

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteItem({productId}));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function UpdateCartItem(productId: string , quantity:number) {
  return async function UpdateCartItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
     
      const response = await APIAuthenticated.patch(
        '/customer/cart/'+ productId,{quantity}
      );

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUpdateItem({ productId ,quantity}));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}