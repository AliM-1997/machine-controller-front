import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { taskReducer } from "./taskSlice";
import { machineReducre } from "./machineSlice";
import { statisticReducer } from "./statisticSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    machine: machineReducre,
    statistic: statisticReducer,
  },
});
export default store;
