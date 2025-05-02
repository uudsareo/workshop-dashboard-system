"use client";

import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import Axios from "../../lib/axios";
import { ISetting } from "@/interfaces/setting";

const url = "/setting";

type InitialState = {
  data: ISetting | null;
  isLoading: boolean;
  error: any;
};

const initialState: InitialState = {
  data: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "settings",
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
    setSettings(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setSettings } = slice.actions;

// Reducer
export default slice.reducer;

export function getSettings() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.get(`${url}`);
      dispatch(setSettings(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateSettings(duration: number, gridCount: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.put(`${url}`, {
        gridCount: gridCount,
        duration: duration,
      });
      dispatch(setSettings(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
