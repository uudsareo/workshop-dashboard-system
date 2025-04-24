"use client";
import { project } from "@/interfaces/project";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import Axios from "../../lib/axios";

const url = "/project";

type InitialState = {
  data: project[] | null;
  isLoading: boolean;
  error: any;
};

const initialState: InitialState = {
  data: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "project",
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

export function getAllInvesment() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.get(`${url}`);
      dispatch(setProjects(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
