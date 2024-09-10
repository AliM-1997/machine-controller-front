import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { taskReducer } from "./taskSlice";
import { machineReducre } from "./machineSlice";
import { statisticReducer } from "./statisticSlice";
import { dataReducer } from "./dataSlice";
import { notificationReducer } from "./notification";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    machine: machineReducre,
    statistic: statisticReducer,
    data: dataReducer,
    notification: notificationReducer,
  },
});
export default store;
