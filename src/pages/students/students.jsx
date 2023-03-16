import { Fragment, React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { reset as classReset } from '../../features/classes/classSlice'
import { getCourses, reset as courseReset } from '../../features/courses/courseSlice'
import { getStudents, updateStudent, logout, reset as studentReset } from '../../features/auth/authSlice'
import StudentTable from "../../components/StudentTable"
import EditRow from '../../components/EditRow';
import Spinner from '../../components/Spinner'

function Students() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, users, isUpdating, isLoading, isDeleting, isError, message } = useSelector(state => state.auth)

    const [editStudentId, setEditStudentId] = useState(null)
    const [editFormData, setEditFormData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        age: '',
        classname: '',
        courseData: ''
    })

    const [dataOnChange, setDataOnChange] = useState({
        courseData: []
    })

    const { courseData } = editFormData

    const onChange = (e) => {
        setEditFormData((prevState) => (
            {
                ...prevState, // spread accross the previous state bcz we want all the other fields
                [e.target.name]: e.target.value

            }))
        e.preventDefault()
    }

    const onEditClick = (event, user) => {
        event.preventDefault()
        setEditStudentId(user.id)

        const editValues = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            age: user.age,
            classname: user.class,
            courseData: user.course.map(course => { return course.course })
        }

        setEditFormData(editValues)
        setDataOnChange(editValues.courseData)
    }

    const handleCancelClick = () => {
        const data = {
            courseData: []
        }
        setDataOnChange(data)
        setEditStudentId(null)

    }

    const onSubmitEdit = (e) => {
        e.preventDefault()

        const editedStudent = {
            id: editStudentId,
            firstname: editFormData.firstname,
            lastname: editFormData.lastname,
            age: editFormData.age,
            class: editFormData.classname,
            courseData: courseData
        }
        console.log("__________________------------------>" + courseData)

        dispatch(updateStudent(editedStudent))
    }

    const onLogout = () => {
        dispatch(logout())
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

        if (isUpdating) {
            setEditStudentId(null)
            // dispatch(getStudents())
        }

        if (isDeleting) {
            dispatch(studentReset())
        }

        dispatch(getCourses())
        dispatch(getStudents())

        return () => {
            dispatch(courseReset())
            dispatch(classReset())
        }
    }, [user, navigate, isUpdating, isError, isDeleting, message, dispatch])

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
            <form onSubmit={onSubmitEdit} className="table_form">
                <table>
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Age</th>
                            <th>Class</th>
                            <th>Courses</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    {users?.map(user => {
                        return (
                            <tbody key={user.id}>
                                <Fragment>
                                    {editStudentId === user.id ? (
                                        <EditRow editFormData={editFormData} setDataOnChange={setDataOnChange} dataOnChange={dataOnChange} onChange={onChange} handleCancelClick={handleCancelClick} />
                                    ) : (
                                        <StudentTable user={user} onEditClick={onEditClick} />
                                    )}
                                </Fragment>
                            </tbody>
                        )
                    })}

                </table>
            </form>
            {/* <CourseForm /> */}
            {/* <div>
                <Link to='/addstudent'><BsPeopleFill /> Add student</Link>
            </div> */}
        </>
    )
}

export default Students