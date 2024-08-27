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
  name: "take",
  reducers: { loadTask, updateTask, clearTask },
});
export const {} = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
