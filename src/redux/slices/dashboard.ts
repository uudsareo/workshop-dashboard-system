"use client";
import {
  DashBoard,
  dashboardData,
  PartData,
  PartWithProject,
} from "@/interfaces/part";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import Axios from "../../lib/axios";

type InitialState = {
  partData: PartWithProject[];
  notifications: any;
  isLoading: boolean;
  error: any;
};

const initialState: InitialState = {
  partData: [],
  notifications: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPart(state, action: PayloadAction<any>) {
      state.partData = action.payload;
      state.isLoading = false;
    },
    setNotification(state, action: PayloadAction<any>) {
      state.notifications = action.payload;
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

export const { setNotification, setPart } = slice.actions;

export function getAllPart(date: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.get(`/part?date=${date}`);
      dispatch(setPart(res.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
