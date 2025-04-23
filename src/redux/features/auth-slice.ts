import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  email: string;
  isAdmin: boolean;
};

const initialState = {
  value: {
    isAuth: false,
    email: "",
    isAdmin: false,
  } as AuthState,
} as initialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,

    logIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          email: action.payload,
          uid: "",
          isAdmin: false,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
