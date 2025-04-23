import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Axios from "../../lib/Axios";
// import { AxiosResponse } from "axios";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  role: {
    id: number;
    name: string;
    status: string;
  };
  avatarLink: string | null;
  status: string;
};

type InitialState = {
  data: User[];
};

const initialState: InitialState = {
  data: [],
};

export const auth = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setUsers } = auth.actions;

export default auth.reducer;
