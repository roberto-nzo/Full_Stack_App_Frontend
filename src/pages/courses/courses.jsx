import React from "react"
import { Link } from 'react-router-dom'
import { SiBookstack } from 'react-icons/si'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { reset as classReset } from "../../features/classes/classSlice"
import { getCourses, reset as courseReset } from "../../features/courses/courseSlice"
import { deleteCourse } from "../../features/courses/courseSlice";
import { logout, reset as studentReset } from '../../features/auth/authSlice'
import Spinner from "../../components/Spinner";

function Courses() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { courses, isLoading, isDeleting, isError, message } = useSelector(state => state.courses)

    const onLogout = () => {
        dispatch(logout())
        dispatch(courseReset())
        navigate('/')
    }

    // Delete one row in course table
    const onDelete = (course) => {
        if (window.confirm(`Are you sure you want to delete class ${course.coursename}`)) {
            dispatch(deleteCourse(course))
            console.log(`Deleted course ${course.coursename} with id ${course.id}`)
        }
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isDeleting) {
            dispatch(courseReset())
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getCourses())

        return () => {
            dispatch(studentReset())
            dispatch(classReset())
        }
    }, [user, navigate, isDeleting, isError, message, dispatch])

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
            <div className="btn_btn">
                <button className="btn_add">
                    <Link to='/addcourse'><SiBookstack />Add course</Link>
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Courses</th>
                        <th>Students</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {courses.map(course => {
                    return <tbody key={course.id}>
                        <tr>
                            <td>{course.coursename}</td>
                            <td>{course.Students.length !== 0 ? course.Students.map(std => std.firstname + ", ") : "-"}</td>
                            <td><AiFillDelete className="edit_row" onClick={() => onDelete(course)} /></td>
                        </tr>
                    </tbody>

                })}
            </table>
        </>
    )
}

export default Courses