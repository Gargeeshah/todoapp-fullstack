import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import taskReducer from "./task/taskSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
    },
});

export default store;