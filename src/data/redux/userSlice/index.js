import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
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
      const { id, name, email, username, role, location, phone_number } =
        action.payload;
      state.id = id;
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
