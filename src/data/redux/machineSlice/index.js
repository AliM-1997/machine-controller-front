import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
    UpdateMachine: (state, action) => {
      return { ...state, ...action.payload };
    },
    ClearMachine: (state, action) => {
      return initialState;
    },
  },
});
export const { LoadMachine, UpdateMachine, ClearMachine } =
  machineSlice.actions;
export const machineReducre = machineSlice.reducer;
