import React from 'react'
import { Link } from 'react-router-dom'
import { BsPeopleFill } from 'react-icons/bs'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import CourseForm from '../../components/CourseForm'
import Spinner from '../../components/Spinner'
// import { getCourses, reset } from '../../features/courses/courseSlice'
import { getStudents, logout, reset } from '../../features/auth/authSlice'

function Students() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, users, isLoading, isError, message } = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        // if (!user) {
        //     navigate('/login')
        // }

        dispatch(getStudents())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <div className="topNav">
                <ul>
                    {user ?
                        (<>
                            <li>
                                <button className="btn" onClick={onLogout}><FaSignOutAlt /> Logout</button>
                            </li>
                        </>) :
                        (<>
                            <li>
                                <Link to='/register'><FaUser /> Register</Link>
                            </li>
                            <li>
                                <Link to='/login'><FaSignInAlt /> Login</Link>
                            </li>
                        </>)}
                </ul>
            </div>
            <div className="main-title">
                <div className="title">
                    <p>Welcome {user && user.firstname + ' ' + user.lastname}</p>
                </div>
            </div>
            {/* <div className="btn_btn">
                <button className="btn_add">
                    <Link to='/addstudent'><BsPeopleFill />Add student</Link>
                </button>
            </div> */}
            <table>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                    <th>Class</th>
                    <th>Courses</th>
                </tr>
                {users.map((user) => {
                    return <tr>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.age}</td>
                        <td>{user.class ? user.class : "-"}</td>
                        <td>{user.course.length !== 0 ? user.course + " " : "-"}</td>
                    </tr>
                })}
            </table>
            {/* <CourseForm /> */}
            {/* <div>
                <Link to='/addstudent'><BsPeopleFill /> Add student</Link>
            </div> */}
        </>
    )
}

export default Students