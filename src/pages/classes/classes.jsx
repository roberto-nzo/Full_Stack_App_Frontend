import React, { useEffect } from "react"
import { Link } from 'react-router-dom'
import { SiGoogleclassroom } from 'react-icons/si'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { CiEdit } from "react-icons/ci"
import { AiFillDelete } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getClasses, deleteClass, reset as classReset } from "../../features/classes/classSlice"
import { reset as courseReset } from "../../features/courses/courseSlice"
import { logout, reset as studentReset } from '../../features/auth/authSlice'
import Spinner from "../../components/Spinner";


function Classes() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { classes, isLoading, isDeleting, isError, message } = useSelector(state => state.classes)

    const onLogout = () => {
        dispatch(logout())
        dispatch(classReset())
        navigate('/')
    }

    // Delete one row in class table
    const onDelete = (class_) => {
        if (window.confirm(`Are you sure you want to delete class ${class_.class}`)) {
            dispatch(deleteClass(class_))
            console.log(`Deleted class ${class_.class} with id ${class_.id}`)
        }
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isDeleting) {
            dispatch(classReset())
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getClasses())

        return () => {
            dispatch(studentReset())
            dispatch(courseReset())
        }
    }, [user, navigate, isDeleting, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <div className="topNav">
                <button className="btn_add">
                    <Link to='/addclass'><SiGoogleclassroom /> Add class</Link>
                </button>
                
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

            <div className="table_class_course">
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Students</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    {classes.map(class_ => {
                        return <tbody key={class_.id}>
                            <tr>
                                <td>{class_.class}</td>
                                <td>{class_.students.length !== 0 ? class_.students.map(std => std.firstname + ", ") : "-"}</td>
                                <td><AiFillDelete className="edit_row" onClick={() => onDelete(class_)} /></td>
                            </tr>
                        </tbody>

                    })}
                </table>
            </div>
            {/* <Link to='/addclass'><SiGoogleclassroom /> Add Class</Link> */}
        </>
    )
}

export default Classes