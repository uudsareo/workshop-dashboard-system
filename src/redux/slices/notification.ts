"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import Axios from "../../lib/axios";
import { INotification } from "@/interfaces/notification";

const url = "/notification";

type InitialState = {
  data: INotification[] | null;
  isLoading: boolean;
  error: any;
};

const initialState: InitialState = {
  data: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "notification",
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
    setProjects(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setProjects } = slice.actions;

// Reducer
export default slice.reducer;

export function createNotification(
  notification: string,
  startOn: string,
  immediate: boolean,
  duration: number
) {
  return async () => {
    const payload = {
      content: notification,
      startOn: startOn,
      duration: duration,
      immediate: immediate,
    };
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.post(`${url}`, payload);
      dispatch(setProjects(res.data));
      return res;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
