import { CiEdit } from "react-icons/ci"

function StudentTable({ user, onEditClick }) {
    return (
        <tr>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.age}</td>
            <td>{user.class ? user.class : "-"}</td>
            <td>{user.course.length !== 0 ? user.course.map(course => { return <span key={course.id}>{course.course + ", "}</span> }) : "-"}</td>
            <td><CiEdit className="edit_row" onClick={(event) => onEditClick(event, user)} /></td>
        </tr>
    )
}

export default StudentTable