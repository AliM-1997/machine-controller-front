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
    loadUser: (state, action) => {},
    updateUser: (state, action) => {
      const { name, email, username, role, location, phone_number } =
        action.payload;
      state.name = name;
      state.email = email;
      state.username = username;
      state.role = role;
      state.location = location;
      state.phone_number = phone_number;
    },
    clearUser: (state, action) => {
      return initialState;
    },
  },
});
export const { clearUser, loadUser, updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
