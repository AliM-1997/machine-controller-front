import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  name: "",
  serial_number: "",
  Standard_pressure: "",
  Standard_temperature: "",
  image_path: "",
  description: "",
};
const sparePartSlice = createSlice({
  initialState,
  name: "sparePart",
  reducers: {
    LoadSparePart: (state, action) => {
      return { ...state, ...action.payload };
    },
    UpdateSparePart: (state, action) => {
      return { ...state, ...action.payload };
    },
    ClearSparePart: (state, action) => {
      return initialState;
    },
  },
});
export const { LoadSparePart, UpdateSparePart, ClearSparePart } =
  sparePartSlice.actions;
export const sparePartReducer = sparePartSlice.reducer;
