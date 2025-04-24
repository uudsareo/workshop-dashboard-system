"use client";
import { project } from "@/interfaces/project";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import Axios from "../../lib/axios";
import { PartData } from "@/interfaces/part";

const url = "/part";

type InitialState = {
  data: PartData[] | null;
  selectedPart: PartData | null;
  imageUrl: string | null;
  isLoading: boolean;
  error: any;
};

const initialState: InitialState = {
  selectedPart: null,
  data: [],
  imageUrl: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "partData",
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
    setPart(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    setSelectedPart(state, action) {
      state.selectedPart = action.payload;
      state.isLoading = false;
    },
    setImageUrl(state, action) {
      state.imageUrl = action.payload;
    },
  },
});

export const { setProjects, setImageUrl, setPart, setSelectedPart } =
  slice.actions;

// Reducer
export default slice.reducer;

export function insertPart(file: File, data: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await Axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const partRes = await Axios.post(url, {
        ...data,
        imagePath: res.data.filePath,
      });
      dispatch(slice.actions.setPart(partRes.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPartList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.get(`${url}`);
      dispatch(setPart(res.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPartById(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.get(`${url}/${id}`);
      dispatch(setSelectedPart(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updatePart(id: string, data: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await Axios.put(`${url}/${id}`, data);
      dispatch(setSelectedPart(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
