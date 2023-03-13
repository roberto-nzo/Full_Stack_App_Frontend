import axios from "axios";

const API_URL = 'courses/'

// Create new course
const createCourse = async (course, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, course, config)
    // console.log(response.data)

    return response.data
}

// get courses
const getCourses = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const courseService = {
    createCourse,
    getCourses
}

export default courseService