import { createSlice } from "@reduxjs/toolkit";
initialState = {
  id: "",
  name: "",
  serial_number: "",
  status: "active",
  location: "",
  image_path: "",
  description: "",
  last_maintenance: "",
  unit_per_hour: "",
  last_maintenance: "",
};
const machineSlice = createSlice({
  initialState,
  name: "machine",
  reducers: {
    LoadMachine: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateMachine: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearMachine: (state, action) => {
      return initialState;
    },
  },
});
export const {} = machineSlice.actions;
export const machineReducr = machineSlice.reducer;
