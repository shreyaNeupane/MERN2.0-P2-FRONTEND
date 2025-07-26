import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User{
    username : string,
    email : string,
    password : string,
    token : string,
    status :string
}

interface AuthState{
    user : User
    status : string
}

const initialState:AuthState ={
    user : {} as User,
    status : "loading"
}

 const authSlice = createSlice({
    name : 'auth',
    initialState ,
    reducers:{
        setUser(state:AuthState,action:PayloadAction<User>){
        //    j data action.payload ma aauxa ra teslai user ma lagera user ma store harne tesko type <user> ho
            state.user = action.payload
        },
        setStatus(state:AuthState,action:PayloadAction<string>){
            state.status = action.payload
        }
    }
})
export const{setUser,setStatus} = authSlice.actions
export default authSlice.reducer