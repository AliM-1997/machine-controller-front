import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  machine_name: "",
  date: "",
  machine_id_1: "",
  machine_id_2: "",
  startDate: "",
  endDate: "",
};
const Statistics = createSlice({
  initialState: initialState,
  name: "statistic",
  reducers: {
    LoadStatistics: (state, action) => {
      return { ...state, ...action.payload };
    },
    FilterStatistics: (state, action) => {
      return { ...state, ...action.payload };
    },
    ClearStatistics: (state, action) => {
      return initialState;
    },
  },
});

export const { LoadStatistics, FilterStatistics, ClearStatistics } =
  Statistics.actions;
export const statisticReducer = Statistics.reducer;
