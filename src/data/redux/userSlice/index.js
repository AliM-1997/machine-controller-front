import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  name: "",
  email: "",
  username: "",
  role: "",
  location: "",
  phone_number: "",
  image_path: "",
  mode: false,
};
const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    loadUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state, action) => {
      return initialState;
    },
  },
});
export const { clearUser, loadUser, updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
