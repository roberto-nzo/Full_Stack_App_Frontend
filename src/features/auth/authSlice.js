import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user')) // we wanna parse (to convert it to an object) it because localstorage can only have a string

const initialState = { // this object pertains to the user part of our state or the authentication
    user: user ? user : null,
    users: [],
    isError: false, // we can change it to true if we get an error from the server
    isSuccess: false,
    isUpdating: false,
    isDeleting: false,
    isRemoving: false,
    isLoading: false, // if we wanna show a spinner
    message: ''
}


// Async thunk function (function that deals with asynchronous data, backend)
// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {// first parameter is a string with the action, second parameter is async function the parameter user is passed in from the register page (register component) and the second parameter <thunkAPI> is used in trycatch

    // we make our request in try
    try {
        return await authService.register(user) // here we return the payload that is coming from our register function, which is set to the user part of our state
    } catch (error) {

        // we get message from the server that could be in couple places
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message) // it will reject and send the message as the payload
    }
})

// Update user
export const updateStudent = createAsyncThunk('auth/update', async (user, thunkAPI) => {
    try {
        return authService.updateStudent(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get students
export const getStudents = createAsyncThunk('students/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getStudents(token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// Delete student
export const deleteStudent = createAsyncThunk('students/delete', async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return authService.deleteStudent(user, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Remove course
export const removeStudentsCourse = createAsyncThunk("students/course/remove", async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return authService.removeStudentsCourse(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Create the slice
export const authSlice = createSlice({
    name: 'auth', // Name of the slice
    initialState,

    // what in reducer functions are not asyncronous, they are not gonna be thunk functions
    reducers: {
        reset: state => { // this function reset the state to the default values or initial values
            state.users = []
            state.isLoading = false
            state.isSuccess = false
            state.isUpdating = false
            state.isDeleting = false
            state.isRemoving = false
            state.isError = false
            state.message = ''
        }
    },

    // here we put asyncronous functions or thunk functions ----- (what we do below: we take in account the pending state, the fullfilled if everything goes okay, and the rejected if there is an error ---> Async thunk functions)
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload // in catch from register we call thunkAPI.rejectWithValue that pass in the message as the payload
                state.user = null
            })
            .addCase(updateStudent.pending, (state) => {
                state.isLoading = true
                state.isUpdating = true
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.isUpdating = false
                state.isLoading = false
                state.isSuccess = true
                // state.users = action.payload
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.isUpdating = false
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(getStudents.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteStudent.pending, (state) => {
                state.isLoading = true
                state.isDeleting = true
            })
            .addCase(deleteStudent.fulfilled, (state) => {
                state.isDeleting = false
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.isDeleting = false
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeStudentsCourse.pending, (state) => {
                state.isLoading = true
                state.isRemoving = true
            })
            .addCase(removeStudentsCourse.fulfilled, (state) => {
                state.isRemoving = false
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeStudentsCourse.rejected, (state, action) => {
                state.isRemoving = false
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


// when we have a function inside reducers we need to export it like the following way
export const { reset } = authSlice.actions
export default authSlice.reducer
