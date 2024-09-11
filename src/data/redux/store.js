import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { taskReducer } from "./taskSlice";
import { machineReducre } from "./machineSlice";
import { statisticReducer } from "./statisticSlice";
import { dataReducer } from "./dataSlice";
import { notificationReducer } from "./notification";
import { sparePartReducer } from "./sparePartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    machine: machineReducre,
    sparePart: sparePartReducer,
    statistic: statisticReducer,
    data: dataReducer,
    notification: notificationReducer,
  },
});
export default store;
