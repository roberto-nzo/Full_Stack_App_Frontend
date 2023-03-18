import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "./courseService";

const initialState = {
    courses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isDeleting: false,
    message: '',
    isCreated: false
}

// Create course
export const createCourse = createAsyncThunk('courses/create', async (course, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await courseService.createCourse(course, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get courses
export const getCourses = createAsyncThunk('courses/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await courseService.getCourses(token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete course
export const deleteCourse = createAsyncThunk('courses/delete', async (courses, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await courseService.deleteCourse(courses, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        reset: state => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.courses.push(action.payload)
                state.isCreated = true
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCourses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = action.payload
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteCourse.pending, (state) => {
                state.isLoading = true
                state.isDeleting = true
            })
            .addCase(deleteCourse.fulfilled, (state) => {
                state.isDeleting = false
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.isDeleting = false
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer