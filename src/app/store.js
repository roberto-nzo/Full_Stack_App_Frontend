import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import courseReducer from "../features/courses/courseSlice"
import classReducer from "../features/classes/classSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: courseReducer,
        classes: classReducer
    }
})