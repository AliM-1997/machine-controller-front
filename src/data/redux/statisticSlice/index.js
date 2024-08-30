import { createSlice } from "@reduxjs/toolkit";
initialState = {
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
  reducers,
});

export const {} = Statistics.actions;
export const statisticReducer = Statistics.reducer;
