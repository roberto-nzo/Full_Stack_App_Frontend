// useState bcz we're gonna have form field each useState will have component level state
import { React, useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getStudents, reset } from '../../features/auth/authSlice';
import { createCourse, getCourses } from '../../features/courses/courseSlice';


function Addcourse() {
    const [formData, setFormData] = useState({
        courseData: '',
        student: ''
    })

    const { courseData, student } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { users } = useSelector(state => state.auth)
    const { isLoading, isError, isSuccess, message, isCreated } = useSelector(state => state.courses)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, // spread accross the previous state bcz we want all the other fields
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess && isCreated) {
            navigate("/courses")
        }

        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch, isCreated])

    const onSubmit = (e) => {
        e.preventDefault()
        const course = {
            courseData,
            student
        }
        dispatch(createCourse(course))
    }

    return <>
        <div className="add">
            <div className="title">
                <p><FaUser /> Register course</p>
            </div>
        </div>

        <div className="form">
            <form action="" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" name='courseData' value={courseData} placeholder='Create Course' onChange={onChange} />
                </div>
                <div className="form-group">
                    <label for="student">Choose a student:</label>
                    <select name="student" id="student" onChange={onChange}>
                        <option value=""></option>
                        {users.map(user => {
                            return <option value={user.id}>{user.firstname} {user.lastname}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>
            </form>
        </div>
    </>
}

export default Addcourse