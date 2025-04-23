import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  data: any;
  isLoading: boolean;
  error: any;
};

const initialState: InitialState = {
  data: [],
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
    setData(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

export const { setData } = slice.actions;
