import { useState, useEffect } from "react"
import { confirmAlert } from 'react-confirm-alert'
import { CiEdit } from "react-icons/ci"
import { AiFillDelete } from "react-icons/ai"
import { deleteStudent, getStudents } from "../features/auth/authSlice"
import { useDispatch } from "react-redux"
import Spinner from "./Spinner"

function StudentTable({ user, onEditClick }) {

    const dispatch = useDispatch()
    const onDelete = (userId) => {
        if (window.confirm(`Are you sure you want to delete ${user.firstname} ${user.lastname}? \n
        All their related information will be deleted as well !`)) {
            dispatch(deleteStudent(userId.id))
        }

    }
    return (
        <tr>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.age}</td>
            <td>{user.class ? user.class : "-"}</td>
            <td>{user.course.length !== 0 ? user.course.map(course => { return <span key={course.id}>{course + ", "}</span> }) : "-"}</td>
            <td><CiEdit className="edit_row" onClick={(event) => onEditClick(event, user)} /></td>
            <td><AiFillDelete className="edit_row" onClick={() => onDelete(user)} /></td>
        </tr>
    )
}

export default StudentTable