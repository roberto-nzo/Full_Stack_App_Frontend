function CourseItem({ course }) {
    return (
        <div className="course">
            <h2>{course.coursename}</h2>
            <h4>
                <ul>
                    {course.Students.map((std) => {
                        return <li>{std.firstname} {std.lastname}</li>
                    })}
                </ul>
            </h4>
        </div>
    )
}

export default CourseItem