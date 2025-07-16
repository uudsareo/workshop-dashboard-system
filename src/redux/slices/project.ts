"use client";
import { project } from "@/interfaces/project";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import Axios from "../../lib/axios";
import { set } from "react-hook-form";

const url = "/project";

type InitialState = {
  data: project[] | null;
  isLoading: boolean;
  error: any;
  selectedProject?: project | null;
};

const initialState: InitialState = {
  data: [],
  isLoading: false,
  error: null,
  selectedProject: null,
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
    setSelectedProject(state, action: PayloadAction<project | null>) {
      state.selectedProject = action.payload;
    },
    resetSelectedProject(state) {
      state.selectedProject = null;
    },
  },
});

export const { setProjects, setSelectedProject, resetSelectedProject } =
  slice.actions;

// Reducer
export default slice.reducer;

export function getProjects() {
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

export function createProject(name: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.post(`${url}`, { name });
      dispatch(getProjects());
      return res;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateProject(id: string, name: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.put(`${url}/${id}`, { name });
      dispatch(getProjects());
      return res;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
