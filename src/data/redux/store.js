import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { taskReducer } from "./taskSlice";
import { machineReducre } from "./machineSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    machine: machineReducre,
  },
});
export default store;
