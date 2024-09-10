import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  MachineSerialNumber: [],
  MachineNames: [],
  UserNames: [],
  SparePartSerialNumber: [],
  UnReadNotification: 0,
};
const data = createSlice({
  initialState: initialState,
  name: "data",
  reducers: {
    LoadData: (state, action) => {
      return { ...state, ...action.payload };
    },
    ClearData: () => {
      return initialState;
    },
  },
});

export const { LoadData, ClearData } = data.actions;
export const dataReducer = data.reducer;
