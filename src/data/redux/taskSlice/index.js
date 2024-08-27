import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  user_id: "",
  machine_id: "",
  spare_part_id: "",
  jobDescription: "",
  assignedDate: "",
  dueDate: "",
  status: "",
  location: "",
};
const taskSlice = createSlice({
  initialState,
  name: "task",
  reducers: {
    loadTask: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateTask: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearTask: (state, action) => {
      return initialState;
    },
  },
});
export const { loadTask, updateTask, clearTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
