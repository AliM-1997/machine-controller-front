import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  email: "",
  username: "",
  role: "",
  location: "",
  phone_number: "",
};
const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    loadUse: (state, action) => {},
    clearUser: (state, action) => {},
  },
});
export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
