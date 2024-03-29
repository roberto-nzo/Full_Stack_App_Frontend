import axios from "axios"

const API_URL = 'classes/'

// Create class
const createClass = async (classes, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    

    const response = await axios.post(API_URL, classes, config)

    return response.data
}

// Get classes
const getClasses = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete classes
const deleteClass = async (classData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    await axios.delete(API_URL + `${classData.id}`, config)
}

const classService = {
    createClass,
    getClasses,
    deleteClass
}

export default classService