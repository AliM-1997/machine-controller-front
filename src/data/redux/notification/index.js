import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    count: 0,
  },
  reducers: {
    incrementNotification(state) {
      state.count += 1;
    },
    decrementNotification(state) {
      state.count -= 1;
    },
    resetNotificationCount(state) {
      state.count = 0;
    },
  },
});

export const {
  incrementNotification,
  decrementNotification,
  resetNotificationCount,
} = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
