import { useSelector } from "react-redux"

function EditRow({ editFormData, onChange, handleCancelClick, dataOnChange }) {

    const { courses } = useSelector(state => state.courses)

    return (
        <tr>
            <td>
                <input type="text" placeholder="Firstname" value={editFormData.firstname} name="firstname" onChange={onChange} />
            </td>
            <td>
                <input type="text" placeholder="Lastname" value={editFormData.lastname} name="lastname" onChange={onChange} />
            </td>
            <td>
                <input type="text" placeholder="Age" name="age" value={editFormData.age} onChange={onChange} />
            </td>
            <td>
            <select name="courseData" id="courseData" onChange={onChange}>
                    <option></option>
                    {courses.map(course => {
                        return <option key={course.id} value={course.coursename} >{course.coursename}</option>
                    })}
                </select>
            </td>
            <td>
                <span>{`${dataOnChange} `}</span>
                <select name="courseData" id="courseData" onChange={onChange}>
                    <option></option>
                    {courses.map(course => {
                        return <option key={course.id} value={course.coursename} >{course.coursename}</option>
                    })}
                </select>
            </td>
            <td>
                <button className="edit_row" type="submit">
                    Save
                </button>
            </td>
            <td>
                <button className="edit_row" type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    )
}

export default EditRow