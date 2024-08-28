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
    LoadMachine,
    updateMachine,
    clearMachine,
  },
});
export const {} = machineSlice.actions;
export const machineReducr = machineSlice.reducer;
