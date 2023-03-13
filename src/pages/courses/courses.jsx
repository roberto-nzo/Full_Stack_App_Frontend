import React from "react"
import { Link } from 'react-router-dom'
import { SiBookstack } from 'react-icons/si'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BsPeopleFill } from 'react-icons/bs'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import CourseForm from "../../components/CourseForm"
import CourseItem from "../../components/CourseItem"
import { getCourses, reset as courseReset } from "../../features/courses/courseSlice"
import { getStudents, logout, reset as studentReset } from '../../features/auth/authSlice'

function Courses() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, users } = useSelector(state => state.auth)
    const { courses, isLoading, isError, message } = useSelector(state => state.courses)

    const onLogout = () => {
        dispatch(logout())
        dispatch(courseReset())
        dispatch(studentReset())
        navigate('/')
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getCourses())
        dispatch(getStudents())

        return () => {
            dispatch(studentReset())
        }
    }, [user, navigate, isError, message, dispatch])
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
            <div className="btn_btn">
                <button className="btn_add">
                    <Link to='/addcourse'><SiBookstack />Add course</Link>
                </button>
            </div>

            <table>
                <tr>
                    <th>Courses</th>
                    <th>Students</th>
                </tr>
                {courses.map(course => {
                    return <tr>
                        <td>{course.coursename}</td>
                        <td>{course.Students.length !== 0 ? course.Students.map(std => std.firstname + ", ") : "-"}</td>
                    </tr>
                })}
            </table>
        </>
    )
}

export default Courses