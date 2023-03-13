// Service file for the http request

import axios from 'axios'

const API_URL = 'students/'


// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData) // we wanna get the response from the server, we send the request and put the response in this variable


    // axios put data inside an object called data
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Get students
const getStudents = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    console.log(response)
    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    getStudents,
    logout
}

export default authService