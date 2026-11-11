import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/TaskSlice";

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
