import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import Axios from "../../lib/Axios";
//
import { dispatch } from "../store";

// ----------------------------------------------------------------------

type Investment = {
  id: number;
  amount: number;
  currentProfit: number;
  investedDate: string;
  startProfitDate: string;
  endProfitDate: string;
  status: string;
};

type InitialState = {
  data: Investment[];
  selected: Investment | null;
  userInvestments: Investment[] | null;
  isLoading: boolean;
  error: any;
};

const initialState: InitialState = {
  data: [],
  selected: null,
  isLoading: false,
  error: null,
  userInvestments: null,
};

const slice = createSlice({
  name: "invesment",
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
    setInvesments: (state, action: PayloadAction<Investment[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    setInvesment: (state, action: PayloadAction<Investment>) => {
      state.userInvestments = [
        ...(state.userInvestments || []), // Use the non-null assertion operator here
        action.payload,
      ];
      state.isLoading = false;
    },

    setUserInvesment: (state, action: PayloadAction<Investment[]>) => {
      state.userInvestments = action.payload;
      state.isLoading = false;
    },

    setApprovedInvesment: (state, action: PayloadAction<Investment>) => {
      const updatedInvestments = state.userInvestments
        ? state.userInvestments.map((investment) =>
            investment.id === action.payload.id ? action.payload : investment
          )
        : [action.payload];

      state.userInvestments = updatedInvestments;
      state.isLoading = false;
    },

    setDeleteInvesment: (state, action: PayloadAction<Investment>) => {
      if (state.userInvestments) {
        state.userInvestments = state.userInvestments.filter(
          (investment) => investment.id !== action.payload.id
        );
      }
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setInvesments,
  setInvesment,
  setUserInvesment,
  setApprovedInvesment,
  setDeleteInvesment,
} = slice.actions;

// ----------------------------------------------------------------------

// export function getAllInvesment() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const res = await Axios.get("/api/investment/all/details/fetch");
//       dispatch(setInvesments(res.data.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

