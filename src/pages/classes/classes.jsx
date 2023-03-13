import React, { useEffect } from "react"
import { Link } from 'react-router-dom'
import { SiGoogleclassroom } from 'react-icons/si'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getClasses, reset as classReset } from "../../features/classes/classSlice"
import { logout, reset } from '../../features/auth/authSlice'


function Classes() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { classes, isLoading, isError, message } = useSelector(state => state.classes)

    const onLogout = () => {
        dispatch(logout())
        dispatch(classReset())
        navigate('/')
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getClasses())

        return () => {
            dispatch(reset())
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
                    <Link to='/addclass'><SiGoogleclassroom /> Add class</Link>
                </button>
            </div>
            <table>
                <tr>
                    <th>Class</th>
                    <th>Students</th>
                </tr>
                {classes.map(class_ => {
                    return <tr>
                        <td>{class_.class}</td>
                        <td>{class_.students.length !== 0 ? class_.students.map(std => std.firstname + ", ") : "-"}</td>
                    </tr>
                })}
            </table>
            {/* <Link to='/addclass'><SiGoogleclassroom /> Add Class</Link> */}
        </>
    )
}

export default Classes