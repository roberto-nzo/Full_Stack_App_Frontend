import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCourse } from "../features/courses/courseSlice";

function CourseForm() {
    const [courseData, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createCourse({ courseData }))
        setText('')
    }

    return <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Course</label>
                <input type="text" name="course" value={courseData} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">Add a course</button>
            </div>
        </form>
    </section>
}

export default CourseForm