import { useSelector } from "react-redux"

function EditRow({ editFormData, onChange, handleCancelClick, coursesData, class_, setDataOnChange, removeCourse, setRemoveCourse }) {

    const { courses } = useSelector(state => state.courses)
    const { classes } = useSelector(state => state.classes)

    // Delete course item
    const onDeleteCourse = (e, coursedt) => {
        e.preventDefault()
        if (window.confirm(`Are you sure to remove ${coursedt} course from student ${editFormData.firstname}?`)) {
            const arrayCoursesData = []
            removeCourse.id = editFormData.id
            for (let i = 0; i < coursesData.length; i++) {
                if (coursesData[i] !== coursedt) {
                    arrayCoursesData.push(coursesData[i])
                } else {
                    removeCourse.removeCourseData.push(coursesData[i])
                    console.log(removeCourse)
                }
                setDataOnChange({
                    class_: class_,
                    coursesData: arrayCoursesData
                })
            }
        }
    }

    const myStyle = {
        color: "red",
        cursor: "pointer"
    }

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
                <span>{`${class_}`}</span>
                <select name="classname" id="classname" onChange={onChange}>
                    <option></option>
                    {classes.map(class_ => {
                        return <option key={class_.id} value={class_.class} >{class_.class}</option>
                    })}
                </select>
                {/* <input type="text" placeholder="Class" name="classname" value={editFormData.classname} onChange={onChange} /> */}
            </td>
            <td>
                <span>{coursesData.map(course => <p>{course}<span style={myStyle} onClick={(e) => onDeleteCourse(e, course)}> x</span></p>)}</span>
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