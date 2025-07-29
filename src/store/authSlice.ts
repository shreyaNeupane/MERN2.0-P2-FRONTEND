import { createSlice } from "@reduxjs/toolkit"; // value import
import type { PayloadAction } from "@reduxjs/toolkit"; // type import

import API from "../http";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  IDLE =""
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}
interface User {
  username: string;
  email: string;
  password: string;
  token: string;
  status: string;
}

interface AuthState {
  user: User;
  status: Status;
}

const initialState: AuthState = {
  user: {} as User,
  status: Status.IDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User>) {
      //    j data action.payload ma aauxa ra teslai user ma lagera user ma store harne tesko type <user> ho
      state.user = action.payload;
    },
    setStatus(state: AuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});
export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

export function register(data: RegisterData) {
  return async function registerThunk(dispatch: any) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("register", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
       dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function login(data: LoginData) {
  return async function loginThunk(dispatch: any) {
    try {
      const response = await API.post("login", data);
      dispatch(setStatus(Status.LOADING));
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
       dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
